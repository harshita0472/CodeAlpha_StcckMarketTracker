$(document).ready(function() {
    // Function to fetch stock data from Alpha Vantage API
    function fetchStockData(symbol) {
        const apiKey = 'T8EYQJJIY78P7WLO';
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
        
        $.getJSON(apiUrl, function(data) {
            // Extract stock data (e.g., close prices) from API response and plot chart
            const timeSeries = data['Time Series (5min)'];
            const dates = Object.keys(timeSeries).slice(0, 10);
            const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

            // Charting library (e.g., Chart.js) can be used to plot the chart
            // Example:
            // const ctx = document.getElementById('stock-chart').getContext('2d');
            // const chart = new Chart(ctx, {
            //     type: 'line',
            //     data: {
            //         labels: dates,
            //         datasets: [{
            //             label: 'Stock Price',
            //             data: prices,
            //         }]
            //     }
            // });
        });
    }

    // Function to fetch financial news from newsapi.org
    function fetchFinancialNews() {
        const apiKey = '9943da841c374aaa84d83728e7f8b0d5';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

        $.getJSON(apiUrl, function(data) {
            // Display top financial news headlines
            const newsFeed = $('#news-feed');
            newsFeed.empty();

            data.articles.slice(0, 5).forEach(article => {
                const newsItem = $('<div>').addClass('news-item');
                const newsLink = $('<a>').attr('href', article.url).text(article.title);
                newsItem.append(newsLink);
                newsFeed.append(newsItem);
            });
        });
    }

    // Example usage: Fetch stock data for Apple (AAPL) and display financial news
    fetchStockData('AAPL');
    fetchFinancialNews();
});
