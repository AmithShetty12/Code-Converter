// Function to format text using Markdown syntax
function formatText(text) {
    // Bold Text: Enclose with double asterisks
    text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    // Italic Text: Enclose with single asterisks or underscores
    text = text.replace(/(\*|_)(.*?)\1/g, '<i>$2</i>');

    // Strikethrough Text: Enclose with double tildes
    text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Underline Text: Enclose with double underscores
    text = text.replace(/__(.*?)__/g, '<u>$1</u>');

    // Monospace Text or Code Blocks: Enclose with backticks
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');

    // Blockquotes: Add > symbol at the beginning of lines
    text = text.split('\n').map(line => `> ${line}`).join('\n');

    // Hyperlinks: Enclose link text in square brackets and URL in parentheses
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Unordered Lists: Replace * or - at the beginning of lines with <li> tags
    text = text.replace(/^[*-]\s(.*)$/gm, '<li>$1</li>');
    text = text.replace(/(?:<li>.*?<\/li>\n?)+/gs, match => {
        if (match.includes('<li>')) {
            return `<ul>${match}</ul>`;
        }
        return match;
    });

    // Ordered Lists: Replace numbers at the beginning of lines with <li> tags
    text = text.replace(/^\d+\.\s(.*)$/gm, '<li>$1</li>');
    text = text.replace(/(?:<li>.*?<\/li>\n?)+/gs, match => {
        if (match.includes('<li>')) {
            return `<ol>${match}</ol>`;
        }
        return match;
    });

    return text;
}

export default formatText;
