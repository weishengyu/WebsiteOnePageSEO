// Website One Page SEO Application - Main JavaScript File

class SEOAnalyzer {
    constructor() {
        this.initializeEventListeners();
        this.setupSmoothScrolling();
    }

    initializeEventListeners() {
        // 綁定開始分析按鈕
        const startButton = document.getElementById('start-analysis');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.scrollToAnalyzer();
            });
        }

        // 綁定分析按鈕
        const analyzeButton = document.getElementById('analyze-btn');
        if (analyzeButton) {
            analyzeButton.addEventListener('click', () => {
                this.analyzeWebsite();
            });
        }

        // 綁定輸入框 Enter 鍵
        const urlInput = document.getElementById('website-url');
        if (urlInput) {
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.analyzeWebsite();
                }
            });
        }
    }

    setupSmoothScrolling() {
        // 為導航連結添加平滑滾動
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    scrollToAnalyzer() {
        const analyzerSection = document.getElementById('analyzer');
        if (analyzerSection) {
            analyzerSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 聚焦到輸入框
            setTimeout(() => {
                const urlInput = document.getElementById('website-url');
                if (urlInput) {
                    urlInput.focus();
                }
            }, 500);
        }
    }

    async analyzeWebsite() {
        const urlInput = document.getElementById('website-url');
        const resultsContainer = document.getElementById('results');
        const analyzeButton = document.getElementById('analyze-btn');
        
        if (!urlInput || !resultsContainer || !analyzeButton) {
            console.error('Required elements not found');
            return;
        }

        const url = urlInput.value.trim();
        
        // 驗證 URL
        if (!this.isValidUrl(url)) {
            this.showError('請輸入有效的網站網址（例如：https://example.com）');
            return;
        }

        // 顯示載入狀態
        this.showLoading(analyzeButton, resultsContainer);

        try {
            // 模擬分析過程（實際專案中這裡會調用真實的 API）
            await this.simulateAnalysis();
            
            // 生成分析結果
            const analysisResults = this.generateAnalysisResults(url);
            this.displayResults(analysisResults);
            
        } catch (error) {
            console.error('分析過程發生錯誤:', error);
            this.showError('分析過程中發生錯誤，請稍後再試。');
        } finally {
            this.hideLoading(analyzeButton);
        }
    }

    isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    }

    showLoading(button, resultsContainer) {
        button.innerHTML = '<span class="loading"></span> 分析中...';
        button.disabled = true;
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><div class="loading"></div><p>正在分析網站，請稍候...</p></div>';
    }

    hideLoading(button) {
        button.innerHTML = '分析網站';
        button.disabled = false;
    }

    async simulateAnalysis() {
        // 模擬分析延遲
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    generateAnalysisResults(url) {
        // 模擬 SEO 分析結果
        const domain = new URL(url).hostname;
        const score = Math.floor(Math.random() * 30) + 70; // 70-100 的隨機分數
        
        return {
            url: url,
            domain: domain,
            overallScore: score,
            metrics: {
                titleTag: this.getRandomScore(),
                metaDescription: this.getRandomScore(),
                headings: this.getRandomScore(),
                images: this.getRandomScore(),
                pageSpeed: this.getRandomScore(),
                mobileOptimization: this.getRandomScore()
            },
            suggestions: this.generateSuggestions(score)
        };
    }

    getRandomScore() {
        return Math.floor(Math.random() * 40) + 60; // 60-100 的隨機分數
    }

    generateSuggestions(overallScore) {
        const allSuggestions = [
            '優化頁面標題，包含主要關鍵字',
            '添加更詳細的 meta description',
            '改善圖片 alt 標籤描述',
            '提升網站載入速度',
            '優化移動端顯示效果',
            '增加內部連結結構',
            '改善網站內容品質',
            '添加結構化數據標記'
        ];

        const numSuggestions = overallScore > 85 ? 2 : overallScore > 75 ? 4 : 6;
        return allSuggestions.slice(0, numSuggestions);
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('results');
        
        const html = `
            <div class="analysis-results">
                <h4>SEO 分析結果</h4>
                <div class="website-info">
                    <p><strong>網站：</strong> ${results.domain}</p>
                    <p><strong>網址：</strong> <a href="${results.url}" target="_blank">${results.url}</a></p>
                </div>
                
                <div class="overall-score">
                    <h5>總體 SEO 分數</h5>
                    <div class="score-circle ${this.getScoreClass(results.overallScore)}">
                        ${results.overallScore}/100
                    </div>
                </div>

                <div class="metrics-breakdown">
                    <h5>詳細指標</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <span>標題標籤</span>
                            <span class="score ${this.getScoreClass(results.metrics.titleTag)}">${results.metrics.titleTag}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>Meta 描述</span>
                            <span class="score ${this.getScoreClass(results.metrics.metaDescription)}">${results.metrics.metaDescription}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>標題結構</span>
                            <span class="score ${this.getScoreClass(results.metrics.headings)}">${results.metrics.headings}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>圖片優化</span>
                            <span class="score ${this.getScoreClass(results.metrics.images)}">${results.metrics.images}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>頁面速度</span>
                            <span class="score ${this.getScoreClass(results.metrics.pageSpeed)}">${results.metrics.pageSpeed}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>移動端優化</span>
                            <span class="score ${this.getScoreClass(results.metrics.mobileOptimization)}">${results.metrics.mobileOptimization}/100</span>
                        </div>
                    </div>
                </div>

                <div class="suggestions">
                    <h5>優化建議</h5>
                    <ul>
                        ${results.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }

    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 80) return 'good';
        if (score >= 70) return 'fair';
        return 'poor';
    }

    showError(message) {
        const resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="error-message">
                    <h4>錯誤</h4>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// CSS 樣式添加到頁面
const additionalStyles = `
    <style>
    .analysis-results {
        text-align: left;
    }
    
    .analysis-results h4 {
        color: #2c3e50;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .website-info {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1.5rem;
    }
    
    .overall-score {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .score-circle {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
        margin-top: 0.5rem;
    }
    
    .score-circle.excellent { background: #27ae60; }
    .score-circle.good { background: #f39c12; }
    .score-circle.fair { background: #e67e22; }
    .score-circle.poor { background: #e74c3c; }
    
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .metric-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 5px;
        align-items: center;
    }
    
    .score {
        font-weight: bold;
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        color: white;
    }
    
    .score.excellent { background: #27ae60; }
    .score.good { background: #f39c12; }
    .score.fair { background: #e67e22; }
    .score.poor { background: #e74c3c; }
    
    .suggestions ul {
        list-style-type: none;
        padding: 0;
    }
    
    .suggestions li {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 5px;
        padding: 0.75rem;
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 2rem;
    }
    
    .suggestions li::before {
        content: "💡";
        position: absolute;
        left: 0.5rem;
    }
    
    .error-message {
        text-align: center;
        color: #e74c3c;
        background: #fdf2f2;
        border: 1px solid #f5b7b1;
        padding: 2rem;
        border-radius: 5px;
    }
    </style>
`;

// 將樣式添加到 head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// 當 DOM 載入完成時初始化應用程式
document.addEventListener('DOMContentLoaded', () => {
    new SEOAnalyzer();
    console.log('Website One Page SEO Application 已初始化');
});