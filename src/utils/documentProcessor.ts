/**
 * Document processor for the RAG chatbot
 * Processes book content and creates searchable chunks
 */

// Function to split content into smaller chunks for better retrieval
export const chunkDocuments = (documents: any[], chunkSize: number = 500) => {
  const chunks = [];

  documents.forEach(doc => {
    const content = typeof doc === 'string' ? doc : doc.content;
    const title = typeof doc === 'string' ? 'Unknown' : doc.title || 'Unknown';

    // Split content into sentences
    const sentences = content.split(/(?<=[.!?])\s+/);
    let currentChunk = '';

    for (const sentence of sentences) {
      if ((currentChunk + sentence).length > chunkSize) {
        // If adding the sentence exceeds chunk size, save current chunk
        if (currentChunk.trim().length > 0) {
          chunks.push({
            id: `${chunks.length + 1}`,
            title: title,
            content: currentChunk.trim()
          });
          currentChunk = sentence + ' ';
        } else {
          // If the sentence itself is longer than chunk size, split it
          if (sentence.length > chunkSize) {
            const words = sentence.split(' ');
            let tempChunk = '';

            for (const word of words) {
              if ((tempChunk + word).length > chunkSize) {
                chunks.push({
                  id: `${chunks.length + 1}`,
                  title: title,
                  content: tempChunk.trim()
                });
                tempChunk = word + ' ';
              } else {
                tempChunk += word + ' ';
              }
            }

            if (tempChunk.trim().length > 0) {
              currentChunk = tempChunk;
            }
          } else {
            currentChunk = sentence + ' ';
          }
        }
      } else {
        currentChunk += sentence + ' ';
      }
    }

    // Add the last chunk if it exists
    if (currentChunk.trim().length > 0) {
      chunks.push({
        id: `${chunks.length + 1}`,
        title: title,
        content: currentChunk.trim()
      });
    }
  });

  return chunks;
};

// Simple similarity function based on word overlap
export const findRelevantChunks = (query: string, chunks: any[], topK: number = 3) => {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);

  // Calculate relevance scores for each chunk
  const scoredChunks = chunks.map(chunk => {
    const contentLower = chunk.content.toLowerCase();
    let score = 0;

    // Count how many query words appear in the chunk
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        score++;
      }
    }

    // Boost score if query words appear in the title
    const titleLower = chunk.title.toLowerCase();
    for (const word of queryWords) {
      if (titleLower.includes(word)) {
        score += 0.5; // Boost for title matches
      }
    }

    // Calculate word overlap ratio
    const chunkWords = contentLower.split(/\s+/);
    let overlapCount = 0;
    for (const word of chunkWords) {
      if (queryWords.includes(word)) {
        overlapCount++;
      }
    }

    const overlapRatio = overlapCount / Math.max(chunkWords.length, queryWords.length);
    score += overlapRatio;

    return {
      ...chunk,
      score
    };
  });

  // Sort by score in descending order and return top K
  return scoredChunks
    .filter(chunk => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};