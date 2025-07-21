const mongoose = require('mongoose');
const gameModel = require('../models/game.model'); // adjust path
const connectToDb = require('../database/mongodb');

async function updateSimilarGames() {
    await connectToDb()
    console.log('Connected to database');

    const games = await gameModel.find();
    console.log(`Found ${games.length} games in database`);

    for (const [index, game] of games.entries()) {
        console.log(`Processing game ${index + 1}/${games.length}: ${game.gameName}`);
        
        if (!game.descriptionEmbedding || game.descriptionEmbedding.length === 0) {
            console.log(`Skipping ${game.gameName}: missing embedding`);
            continue;
        }
        console.log(`Game ${game.gameName} has embedding of length ${game.descriptionEmbedding.length}`);

        const similarities = [];
        let validComparisons = 0;

        for (const otherGame of games) {
            if (game._id.equals(otherGame._id)) continue;  // skip self

            if (!otherGame.descriptionEmbedding || otherGame.descriptionEmbedding.length === 0) {
                continue;
            }

            try {
                const similarity = cosineSimilarity(
                    game.descriptionEmbedding,
                    otherGame.descriptionEmbedding
                );
                
                validComparisons++;
                
                if (isNaN(similarity)) {
                    console.log(`Warning: Got NaN similarity between ${game.gameName} and ${otherGame.gameName}`);
                    continue;
                }
                
                similarities.push({
                    gameId: otherGame._id,
                    gameName: otherGame.gameName, // For debugging
                    similarity
                });
            } catch (error) {
                console.error(`Error calculating similarity between ${game.gameName} and ${otherGame.gameName}:`, error.message);
            }
        }

        console.log(`Made ${validComparisons} valid comparisons for ${game.gameName}`);
        console.log(`Found ${similarities.length} similarity entries`);
        
        if (similarities.length === 0) {
            console.log(`Warning: No similarities found for ${game.gameName}`);
            continue;
        }

        // Sort descending (highest similarity first)
        similarities.sort((a, b) => b.similarity - a.similarity);
        
        // Log top similarities for debugging
        console.log('Top similarities:');
        similarities.slice(0, 5).forEach((sim, i) => {
            console.log(`  ${i+1}. ${sim.gameName}: ${sim.similarity.toFixed(4)}`);
        });

        // Pick top N similar games (e.g., top 5)
        const topSimilar = similarities.slice(0, 5).map(item => item.gameId);
        console.log(`Selected ${topSimilar.length} similar games for ${game.gameName}`);

        // Update similarGames field
        game.similarGames = topSimilar;
        
        try {
            await game.save();
            console.log(`Successfully updated similarGames for ${game.gameName}`);
        } catch (error) {
            console.error(`Error saving ${game.gameName}:`, error.message);
        }
    }

    console.log('All games updated.');
    mongoose.disconnect();
}

function cosineSimilarity(vecA, vecB) {
    if (!Array.isArray(vecA) || !Array.isArray(vecB) || vecA.length !== vecB.length) {
        throw new Error('Vectors must be arrays of the same length');
    }

    // Calculate dot product
    let dotProduct = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
    }

    // Calculate magnitudes
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    // Check for zero magnitudes to avoid division by zero
    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0;
    }

    // Return the cosine similarity
    return dotProduct / (magnitudeA * magnitudeB);
}

updateSimilarGames();
