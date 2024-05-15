const filter = (data) => {
    data = filter1(data);
    return filter2(data);
}

const filter1 = (data) => {
    // Replace occurrences of "**" with a space
    data = data.replace(/\*\*/g, '');
    
    return data;
}

const filter2 = (data) => {
    // Replace occurrences of "```" with a space followed by a newline
    return data.replace(/```/g, '\n');
}

export default filter;
