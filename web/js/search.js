$('#search-box').search({
    type: 'category',
    minCharacters: 3,
    apiSettings: {
        url: '../data/serach.json'
    }
});
