const mongoose = require('mongoose');
const gameModel = require('../models/game.model'); // adjust path
const connectToDb = require('../database/mongodb');

async function updateSimilarGames() {
    await connectToDb()
    console.log('Connected to database');

    const games = await gameModel.find();
    const allSimilarities = [];
    
    // Process all games to find similar ones
    for (let i = 0; i < games.length; i++) {
        const currentGame = games[i];
        const similarGames = [];
        const gamesSimilarities = [];
        
        if (!currentGame.descriptionEmbedding || currentGame.descriptionEmbedding.length === 0) {
            console.log(`Game ${currentGame.gameName} has no description embedding`);
            continue;
        }
        
        for (let j = 0; j < games.length; j++) {
            if (i === j) continue; // Skip comparing game with itself
            
            const otherGame = games[j];
            
            if (!otherGame.descriptionEmbedding || otherGame.descriptionEmbedding.length === 0) {
                continue;
            }
            
            try {
                const similarity = cosineSimilarity(currentGame.descriptionEmbedding, otherGame.descriptionEmbedding);
                allSimilarities.push(similarity);
                gamesSimilarities.push({ game: otherGame.gameName, similarity });
                // Lowered threshold to 0.4 - adjust based on your data
                if (similarity > 0.4) {
                    similarGames.push(otherGame._id);
                }
            } catch (error) {
                console.log(`Error comparing ${currentGame.gameName} and ${otherGame.gameName}: ${error.message}`);
            }
        }
        
        // Sort similarities to see the highest ones
        gamesSimilarities.sort((a, b) => b.similarity - a.similarity);
        
        // Show top 3 most similar games for debugging
        console.log(`Top similarities for ${currentGame.gameName}:`);
        gamesSimilarities.slice(0, 3).forEach(item => {
            console.log(`  - ${item.game}: ${item.similarity.toFixed(4)}`);
        });
        
        // Update the current game's similar games
        currentGame.moreInfo.similarGames = similarGames;
        await currentGame.save();
        console.log(`Updated similar games for ${currentGame.gameName}: found ${similarGames.length} similar games\n`);
    }
    
    // Show overall similarity statistics
    if (allSimilarities.length > 0) {
        allSimilarities.sort((a, b) => b - a);
        console.log('\n=== SIMILARITY STATISTICS ===');
        console.log(`Total comparisons: ${allSimilarities.length}`);
        console.log(`Highest similarity: ${allSimilarities[0].toFixed(4)}`);
        console.log(`Lowest similarity: ${allSimilarities[allSimilarities.length - 1].toFixed(4)}`);
        console.log(`Average similarity: ${(allSimilarities.reduce((a, b) => a + b, 0) / allSimilarities.length).toFixed(4)}`);
        console.log(`Median similarity: ${allSimilarities[Math.floor(allSimilarities.length / 2)].toFixed(4)}`);
        
        // Show distribution
        const above05 = allSimilarities.filter(s => s > 0.5).length;
        const above04 = allSimilarities.filter(s => s > 0.4).length;
        const above03 = allSimilarities.filter(s => s > 0.3).length;
        const above02 = allSimilarities.filter(s => s > 0.2).length;
        
        console.log(`\nSimilarities > 0.5: ${above05} (${(above05/allSimilarities.length*100).toFixed(1)}%)`);
        console.log(`Similarities > 0.4: ${above04} (${(above04/allSimilarities.length*100).toFixed(1)}%)`);
        console.log(`Similarities > 0.3: ${above03} (${(above03/allSimilarities.length*100).toFixed(1)}%)`);
        console.log(`Similarities > 0.2: ${above02} (${(above02/allSimilarities.length*100).toFixed(1)}%)`);
    }
    
    console.log('\nDisconnecting from database');
    await mongoose.connection.close();
    console.log('Disconnected from database');
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
