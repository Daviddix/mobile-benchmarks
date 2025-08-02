const { default: mongoose } = require('mongoose');
const connectToDb = require('../database/mongodb');
const gameModel = require('../models/game.model');

async function generateEmbedding(text) {
    const response = await fetch('http://localhost:5000/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    if (!response.ok) {
        throw new Error('Embedding service failed');
    }

    const data = await response.json();
    return data.embedding;
}

async function processGames() {
    await connectToDb()

    const games = await gameModel.find();

    for (const game of games) {
        if (game.descriptionEmbedding?.length) {
            console.log(`Embedding already exists for ${game.gameName}`);
            continue;
        }

        console.log(`Generating embedding for: ${game.gameName}`);

        try {
            // Combine description and category for richer embeddings
            const combinedText = `Genre: ${game.gameCategory}. Description: ${game.gameDescription}`;
            
            const embedding = await generateEmbedding(combinedText);

            game.descriptionEmbedding = embedding;
            await game.save();

            console.log(`Saved embedding for ${game.gameName}`);
        } catch (error) {
            console.error(`Failed for ${game.gameName}:`, error.message);
        }
    }

    console.log('All games processed.');
    mongoose.disconnect();
}

processGames();