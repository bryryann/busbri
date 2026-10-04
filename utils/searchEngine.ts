const normalize = (text: string) => {
    return text.toLowerCase()
               .normalize('NFD')
               .replace(/[\u0300-\u036f]/g, '')
               .trim();
};

const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array.from(
        { length: b.length + 1 },
        (_, i) => [i]
    );

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

const similarity = (a: string, b: string): number => {
    const distance = levenshteinDistance(a, b);
    const maxLen = Math.max(a.length, b.length);

    if (maxLen === 0) {
        return 1;
    }

    return 1 - distance / maxLen;
};

const getSearchScore = (name: string, query: string): number => {
    const text = normalize(name);
    const q = normalize(query);

    if (!q) return 0;

    if (text === q) {
        return 1;
    }

    if (text.startsWith(q)) {
        return 0.95;
    }

    if (text.includes(q)) {
        return 0.85;
    }

    const words = text.split(/\s+/);

    return Math.max(
        ...words.map(w => similarity(w, q))
    );
};

export const fuzzySearch = <T extends {name: string}>(
    data: T[],
    query: string,
    threshold = 0.5
): T[] => {
    if (!query.trim()) {
        return data;
    }

    return data
        .map(item => ({
            item,
            score: getSearchScore(item.name, query)
        }))
        .filter(result => result.score >= threshold)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
};
