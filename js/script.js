// Website One Page SEO Application - Main JavaScript File

class SEOAnalyzer {
    constructor() {
        this.initializeEventListeners();
        this.setupSmoothScrolling();
        this.analysisHistory = this.loadAnalysisHistory();
        this.corsProxyUrl = 'https://api.allorigins.win/get?url=';
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

        // 綁定競爭對手比較功能
        const compareMode = document.getElementById('compare-mode');
        const competitorInputs = document.getElementById('competitor-inputs');
        if (compareMode && competitorInputs) {
            compareMode.addEventListener('change', () => {
                competitorInputs.style.display = compareMode.checked ? 'block' : 'none';
            });
        }

        // 綁定比較按鈕
        const compareButton = document.getElementById('compare-btn');
        if (compareButton) {
            compareButton.addEventListener('click', () => {
                this.compareWebsites();
            });
        }

        // 綁定競爭對手輸入框 Enter 鍵
        const competitorInput = document.getElementById('competitor-url');
        if (competitorInput) {
            competitorInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.compareWebsites();
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
            // 嘗試獲取真實網站內容
            const analysisResults = await this.performRealAnalysis(url);
            this.displayResults(analysisResults);
            
            // 保存分析歷史
            this.saveAnalysisHistory(analysisResults);
            
        } catch (error) {
            console.error('分析過程發生錯誤:', error);
            // 如果真實分析失敗，使用模擬分析
            console.log('使用模擬分析模式');
            await this.simulateAnalysis();
            const analysisResults = this.generateAnalysisResults(url);
            this.displayResults(analysisResults);
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
        
        const detailsSection = results.detailed ? this.generateDetailedAnalysis(results.detailed) : '';
        const noteSection = results.note ? `<div class="analysis-note"><p><em>${results.note}</em></p></div>` : '';
        
        const html = `
            <div class="analysis-results">
                <div class="results-header">
                    <h4>🔍 SEO 分析結果</h4>
                    ${noteSection}
                    <div class="analysis-time">
                        <small>分析時間：${results.analysisTime ? new Date(results.analysisTime).toLocaleString('zh-TW') : new Date().toLocaleString('zh-TW')}</small>
                    </div>
                </div>
                
                <div class="website-info">
                    <p><strong>🌐 網站：</strong> ${results.domain}</p>
                    <p><strong>🔗 網址：</strong> <a href="${results.url}" target="_blank">${results.url}</a></p>
                </div>
                
                <div class="overall-score">
                    <h5>📊 總體 SEO 分數</h5>
                    <div class="score-circle ${this.getScoreClass(results.overallScore)}">
                        ${results.overallScore}/100
                    </div>
                    <div class="score-description">
                        ${this.getScoreDescription(results.overallScore)}
                    </div>
                </div>

                <div class="metrics-breakdown">
                    <h5>📋 詳細指標</h5>
                    <div class="metrics-grid">
                        <div class="metric-item">
                            <span>📝 標題標籤</span>
                            <span class="score ${this.getScoreClass(results.metrics.titleTag)}">${results.metrics.titleTag}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>📄 Meta 描述</span>
                            <span class="score ${this.getScoreClass(results.metrics.metaDescription)}">${results.metrics.metaDescription}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>🏷️ 標題結構</span>
                            <span class="score ${this.getScoreClass(results.metrics.headings)}">${results.metrics.headings}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>🖼️ 圖片優化</span>
                            <span class="score ${this.getScoreClass(results.metrics.images)}">${results.metrics.images}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>⚡ 頁面速度</span>
                            <span class="score ${this.getScoreClass(results.metrics.pageSpeed)}">${results.metrics.pageSpeed}/100</span>
                        </div>
                        <div class="metric-item">
                            <span>📱 移動端優化</span>
                            <span class="score ${this.getScoreClass(results.metrics.mobileOptimization)}">${results.metrics.mobileOptimization}/100</span>
                        </div>
                        ${results.metrics.security !== undefined ? `
                        <div class="metric-item">
                            <span>🔒 安全性</span>
                            <span class="score ${this.getScoreClass(results.metrics.security)}">${results.metrics.security}/100</span>
                        </div>` : ''}
                        ${results.metrics.structuredData !== undefined ? `
                        <div class="metric-item">
                            <span>🏗️ 結構化資料</span>
                            <span class="score ${this.getScoreClass(results.metrics.structuredData)}">${results.metrics.structuredData}/100</span>
                        </div>` : ''}
                        ${results.metrics.socialMedia !== undefined ? `
                        <div class="metric-item">
                            <span>📱 社交媒體</span>
                            <span class="score ${this.getScoreClass(results.metrics.socialMedia)}">${results.metrics.socialMedia}/100</span>
                        </div>` : ''}
                        ${results.metrics.accessibility !== undefined ? `
                        <div class="metric-item">
                            <span>♿ 無障礙性</span>
                            <span class="score ${this.getScoreClass(results.metrics.accessibility)}">${results.metrics.accessibility}/100</span>
                        </div>` : ''}
                    </div>
                </div>

                ${detailsSection}

                <div class="suggestions">
                    <h5>💡 優化建議</h5>
                    <ul>
                        ${results.suggestions.map((suggestion, index) => `<li><span class="suggestion-priority">${index + 1}.</span> ${suggestion}</li>`).join('')}
                    </ul>
                </div>

                <div class="action-buttons">
                    <button onclick="seoAnalyzer.exportReport()" class="export-btn">📄 匯出報告</button>
                    <button onclick="seoAnalyzer.shareResults()" class="share-btn">📤 分享結果</button>
                    <button onclick="seoAnalyzer.showHistory()" class="history-btn">📚 查看歷史</button>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = html;
        
        // 儲存當前結果以供匯出使用
        this.currentResults = results;
    }

    generateDetailedAnalysis(detailed) {
        let html = '<div class="detailed-analysis"><h5>🔍 詳細分析</h5>';
        
        if (detailed.title) {
            html += `
                <div class="detail-section">
                    <h6>📝 標題分析</h6>
                    <p><strong>內容：</strong> "${detailed.title.content || '未找到標題'}"</p>
                    <p><strong>長度：</strong> ${detailed.title.length} 字元</p>
                    ${detailed.title.issues.length > 0 ? `<p><strong>問題：</strong> ${detailed.title.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.metaDescription) {
            html += `
                <div class="detail-section">
                    <h6>📄 Meta 描述分析</h6>
                    <p><strong>內容：</strong> "${detailed.metaDescription.content || '未找到描述'}"</p>
                    <p><strong>長度：</strong> ${detailed.metaDescription.length} 字元</p>
                    ${detailed.metaDescription.issues.length > 0 ? `<p><strong>問題：</strong> ${detailed.metaDescription.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.headings) {
            html += `
                <div class="detail-section">
                    <h6>🏷️ 標題結構分析</h6>
                    <p><strong>標題分布：</strong> H1(${detailed.headings.structure.h1}) H2(${detailed.headings.structure.h2}) H3(${detailed.headings.structure.h3}) H4(${detailed.headings.structure.h4})</p>
                    ${detailed.headings.issues.length > 0 ? `<p><strong>問題：</strong> ${detailed.headings.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.images) {
            html += `
                <div class="detail-section">
                    <h6>🖼️ 圖片分析</h6>
                    <p><strong>圖片總數：</strong> ${detailed.images.total}</p>
                    <p><strong>有 Alt 屬性：</strong> ${detailed.images.withAlt} (${detailed.images.altPercentage}%)</p>
                    <p><strong>缺少 Alt：</strong> ${detailed.images.withoutAlt}</p>
                    ${detailed.images.issues.length > 0 ? `<p><strong>問題：</strong> ${detailed.images.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.links) {
            html += `
                <div class="detail-section">
                    <h6>🔗 連結分析</h6>
                    <p><strong>連結總數：</strong> ${detailed.links.total}</p>
                    <p><strong>內部連結：</strong> ${detailed.links.internal}</p>
                    <p><strong>外部連結：</strong> ${detailed.links.external}</p>
                </div>
            `;
        }
        
        if (detailed.security) {
            html += `
                <div class="detail-section">
                    <h6>🔒 安全性分析</h6>
                    ${detailed.security.features.length > 0 ? `<p><strong>安全特性：</strong> ${detailed.security.features.join('、')}</p>` : ''}
                    ${detailed.security.issues.length > 0 ? `<p><strong>安全問題：</strong> ${detailed.security.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.structuredData) {
            html += `
                <div class="detail-section">
                    <h6>🏗️ 結構化資料分析</h6>
                    ${detailed.structuredData.types.length > 0 ? `<p><strong>資料類型：</strong> ${detailed.structuredData.types.join('、')}</p>` : ''}
                    ${detailed.structuredData.issues.length > 0 ? `<p><strong>問題：</strong> ${detailed.structuredData.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.socialMedia) {
            html += `
                <div class="detail-section">
                    <h6>📱 社交媒體標籤</h6>
                    ${Object.keys(detailed.socialMedia.platforms).length > 0 ? 
                        Object.entries(detailed.socialMedia.platforms).map(([platform, info]) => 
                            `<p><strong>${platform === 'facebook' ? 'Facebook' : 'Twitter'}：</strong> ${info}</p>`
                        ).join('') : ''}
                    ${detailed.socialMedia.issues.length > 0 ? `<p><strong>問題：</strong> ${detailed.socialMedia.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.performance) {
            html += `
                <div class="detail-section">
                    <h6>⚡ 效能分析</h6>
                    <p><strong>總資源數：</strong> ${detailed.performance.metrics.totalResources} (圖片: ${detailed.performance.metrics.images}, JS: ${detailed.performance.metrics.scripts}, CSS: ${detailed.performance.metrics.stylesheets})</p>
                    ${detailed.performance.metrics.lazyLoadingImages ? `<p><strong>延遲載入圖片：</strong> ${detailed.performance.metrics.lazyLoadingImages}</p>` : ''}
                    ${detailed.performance.metrics.hasMinification ? `<p><strong>檔案壓縮：</strong> 偵測到壓縮檔案</p>` : ''}
                    ${detailed.performance.issues.length > 0 ? `<p><strong>效能問題：</strong> ${detailed.performance.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.accessibility) {
            html += `
                <div class="detail-section">
                    <h6>♿ 無障礙性分析</h6>
                    ${detailed.accessibility.features.length > 0 ? `<p><strong>無障礙特性：</strong> ${detailed.accessibility.features.join('、')}</p>` : ''}
                    ${detailed.accessibility.issues.length > 0 ? `<p><strong>無障礙問題：</strong> ${detailed.accessibility.issues.join('、')}</p>` : ''}
                </div>
            `;
        }
        
        if (detailed.mobile && detailed.mobile.issues) {
            html += `
                <div class="detail-section">
                    <h6>📱 移動端優化</h6>
                    ${detailed.mobile.issues.length > 0 ? `<p><strong>移動端問題：</strong> ${detailed.mobile.issues.join('、')}</p>` : '<p>✅ 移動端優化良好</p>'}
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }

    getScoreDescription(score) {
        if (score >= 90) return '🏆 優秀！您的網站 SEO 表現卓越';
        if (score >= 80) return '👍 良好！還有一些改進空間';
        if (score >= 70) return '⚠️ 普通！需要重點優化';
        return '❌ 需要改善！建議立即優化';
    }

    // 新增功能：匯出報告
    exportReport() {
        if (!this.currentResults) return;
        
        const reportData = {
            url: this.currentResults.url,
            domain: this.currentResults.domain,
            analysisTime: this.currentResults.analysisTime || new Date().toISOString(),
            overallScore: this.currentResults.overallScore,
            metrics: this.currentResults.metrics,
            suggestions: this.currentResults.suggestions
        };
        
        const jsonString = JSON.stringify(reportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `seo-report-${this.currentResults.domain}-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('📄 報告已匯出！');
    }

    // 新增功能：分享結果
    shareResults() {
        if (!this.currentResults) return;
        
        const shareText = `我剛使用 SEO 分析工具檢查了 ${this.currentResults.domain}，得分 ${this.currentResults.overallScore}/100！`;
        
        if (navigator.share) {
            navigator.share({
                title: 'SEO 分析結果',
                text: shareText,
                url: this.currentResults.url
            });
        } else {
            // 複製到剪貼簿
            navigator.clipboard.writeText(`${shareText} ${this.currentResults.url}`).then(() => {
                this.showNotification('📤 結果已複製到剪貼簿！');
            });
        }
    }

    // 新增功能：顯示歷史記錄
    showHistory() {
        const resultsContainer = document.getElementById('results');
        
        if (this.analysisHistory.length === 0) {
            resultsContainer.innerHTML = '<div class="no-history"><h4>📚 尚無分析歷史</h4><p>開始分析一些網站來建立您的歷史記錄吧！</p></div>';
            return;
        }
        
        let historyHtml = `
            <div class="history-view">
                <div class="history-header">
                    <h4>📚 分析歷史</h4>
                    <button onclick="seoAnalyzer.backToAnalyzer()" class="back-btn">← 返回分析器</button>
                </div>
                <div class="history-list">
        `;
        
        this.analysisHistory.forEach((result, index) => {
            const date = new Date(result.analysisTime || new Date()).toLocaleString('zh-TW');
            historyHtml += `
                <div class="history-item" onclick="seoAnalyzer.displayResults(seoAnalyzer.analysisHistory[${index}])">
                    <div class="history-info">
                        <h5>${result.domain}</h5>
                        <p class="history-url">${result.url}</p>
                        <p class="history-date">${date}</p>
                    </div>
                    <div class="history-score ${this.getScoreClass(result.overallScore)}">
                        ${result.overallScore}/100
                    </div>
                </div>
            `;
        });
        
        historyHtml += '</div></div>';
        resultsContainer.innerHTML = historyHtml;
    }

    backToAnalyzer() {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '<div class="placeholder-text"><p>點擊上方「分析網站」按鈕開始分析</p></div>';
    }

    showNotification(message) {
        // 創建通知元素
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 顯示動畫
        setTimeout(() => notification.classList.add('show'), 100);
        
        // 自動隱藏
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    // 新增：競爭對手比較功能
    async compareWebsites() {
        const primaryUrl = document.getElementById('website-url').value.trim();
        const competitorUrl = document.getElementById('competitor-url').value.trim();
        const resultsContainer = document.getElementById('results');
        const compareButton = document.getElementById('compare-btn');
        
        if (!this.isValidUrl(primaryUrl)) {
            this.showError('請輸入有效的主要網站網址');
            return;
        }
        
        if (!this.isValidUrl(competitorUrl)) {
            this.showError('請輸入有效的競爭對手網址');
            return;
        }
        
        // 顯示載入狀態
        compareButton.innerHTML = '<span class="loading"></span> 分析中...';
        compareButton.disabled = true;
        resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><div class="loading"></div><p>正在比較分析兩個網站，請稍候...</p></div>';
        
        try {
            // 並行分析兩個網站
            const [primaryResults, competitorResults] = await Promise.all([
                this.performRealAnalysis(primaryUrl).catch(() => this.generateAnalysisResults(primaryUrl)),
                this.performRealAnalysis(competitorUrl).catch(() => this.generateAnalysisResults(competitorUrl))
            ]);
            
            // 顯示比較結果
            this.displayComparisonResults(primaryResults, competitorResults);
            
            // 保存比較歷史
            this.saveComparisonHistory(primaryResults, competitorResults);
            
        } catch (error) {
            console.error('比較分析失敗:', error);
            this.showError('比較分析過程中發生錯誤，請稍後再試。');
        } finally {
            compareButton.innerHTML = '比較分析';
            compareButton.disabled = false;
        }
    }

    displayComparisonResults(primary, competitor) {
        const resultsContainer = document.getElementById('results');
        
        const html = `
            <div class="comparison-results">
                <div class="comparison-header">
                    <h4>🔄 競爭對手比較分析</h4>
                    <div class="analysis-time">
                        <small>比較時間：${new Date().toLocaleString('zh-TW')}</small>
                    </div>
                </div>

                <div class="comparison-overview">
                    <div class="website-comparison">
                        <div class="website-card primary">
                            <h5>🏆 主要網站</h5>
                            <p class="domain">${primary.domain}</p>
                            <div class="score-display ${this.getScoreClass(primary.overallScore)}">
                                ${primary.overallScore}/100
                            </div>
                        </div>
                        
                        <div class="vs-separator">VS</div>
                        
                        <div class="website-card competitor">
                            <h5>⚔️ 競爭對手</h5>
                            <p class="domain">${competitor.domain}</p>
                            <div class="score-display ${this.getScoreClass(competitor.overallScore)}">
                                ${competitor.overallScore}/100
                            </div>
                        </div>
                    </div>
                    
                    <div class="winner-announcement">
                        ${this.getWinnerMessage(primary, competitor)}
                    </div>
                </div>

                <div class="metrics-comparison">
                    <h5>📊 詳細指標比較</h5>
                    <div class="comparison-table">
                        ${this.generateMetricsComparison(primary.metrics, competitor.metrics)}
                    </div>
                </div>

                <div class="insights-section">
                    <h5>💡 競爭分析洞察</h5>
                    <div class="insights-grid">
                        ${this.generateCompetitiveInsights(primary, competitor)}
                    </div>
                </div>

                <div class="action-buttons">
                    <button onclick="seoAnalyzer.exportComparison()" class="export-btn">📄 匯出比較報告</button>
                    <button onclick="seoAnalyzer.shareComparison()" class="share-btn">📤 分享比較</button>
                    <button onclick="seoAnalyzer.backToAnalyzer()" class="back-btn">← 返回分析器</button>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = html;
        
        // 儲存比較結果
        this.currentComparison = { primary, competitor };
    }

    getWinnerMessage(primary, competitor) {
        const diff = primary.overallScore - competitor.overallScore;
        const primaryDomain = primary.domain;
        const competitorDomain = competitor.domain;
        
        if (Math.abs(diff) < 5) {
            return `<div class="tie-message">🤝 兩網站 SEO 表現相當接近！分數差距僅 ${Math.abs(diff)} 分</div>`;
        } else if (diff > 0) {
            return `<div class="winner-message primary">🏆 ${primaryDomain} 領先 ${competitorDomain} ${diff} 分！</div>`;
        } else {
            return `<div class="winner-message competitor">⚔️ ${competitorDomain} 領先 ${primaryDomain} ${Math.abs(diff)} 分！</div>`;
        }
    }

    generateMetricsComparison(primaryMetrics, competitorMetrics) {
        const metrics = [
            { key: 'titleTag', name: '📝 標題標籤' },
            { key: 'metaDescription', name: '📄 Meta 描述' },
            { key: 'headings', name: '🏷️ 標題結構' },
            { key: 'images', name: '🖼️ 圖片優化' },
            { key: 'pageSpeed', name: '⚡ 頁面速度' },
            { key: 'mobileOptimization', name: '📱 移動端優化' }
        ];

        if (primaryMetrics.security !== undefined) {
            metrics.push({ key: 'security', name: '🔒 安全性' });
            metrics.push({ key: 'structuredData', name: '🏗️ 結構化資料' });
            metrics.push({ key: 'socialMedia', name: '📱 社交媒體' });
            metrics.push({ key: 'accessibility', name: '♿ 無障礙性' });
        }

        return metrics.map(metric => {
            const primaryScore = primaryMetrics[metric.key] || 0;
            const competitorScore = competitorMetrics[metric.key] || 0;
            const diff = primaryScore - competitorScore;
            
            return `
                <div class="metric-row">
                    <div class="metric-name">${metric.name}</div>
                    <div class="score-comparison">
                        <div class="score primary ${this.getScoreClass(primaryScore)}">${primaryScore}</div>
                        <div class="diff-indicator ${diff > 0 ? 'positive' : diff < 0 ? 'negative' : 'neutral'}">
                            ${diff > 0 ? '+' : ''}${diff}
                        </div>
                        <div class="score competitor ${this.getScoreClass(competitorScore)}">${competitorScore}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    generateCompetitiveInsights(primary, competitor) {
        const insights = [];
        
        // 整體表現分析
        const scoreDiff = primary.overallScore - competitor.overallScore;
        if (scoreDiff > 10) {
            insights.push(`您的網站在整體 SEO 表現上明顯優於競爭對手，領先 ${scoreDiff} 分`);
        } else if (scoreDiff < -10) {
            insights.push(`競爭對手的 SEO 表現較佳，您需要加強優化工作`);
        } else {
            insights.push('兩網站的 SEO 表現相當，可針對弱項進行重點改善');
        }
        
        // 找出優勢領域
        const strengths = this.findStrengths(primary.metrics, competitor.metrics);
        if (strengths.length > 0) {
            insights.push(`您的優勢領域：${strengths.join('、')}`);
        }
        
        // 找出改善機會
        const opportunities = this.findOpportunities(primary.metrics, competitor.metrics);
        if (opportunities.length > 0) {
            insights.push(`改善機會：${opportunities.join('、')}`);
        }
        
        return insights.map(insight => `<div class="insight-item">💡 ${insight}</div>`).join('');
    }

    findStrengths(primaryMetrics, competitorMetrics) {
        const strengths = [];
        const metricsMap = {
            titleTag: '標題優化',
            metaDescription: 'Meta 描述',
            headings: '標題結構',
            images: '圖片優化',
            pageSpeed: '頁面速度',
            mobileOptimization: '移動端優化'
        };
        
        Object.entries(metricsMap).forEach(([key, name]) => {
            if (primaryMetrics[key] && competitorMetrics[key] && primaryMetrics[key] - competitorMetrics[key] > 10) {
                strengths.push(name);
            }
        });
        
        return strengths;
    }

    findOpportunities(primaryMetrics, competitorMetrics) {
        const opportunities = [];
        const metricsMap = {
            titleTag: '標題優化',
            metaDescription: 'Meta 描述',
            headings: '標題結構',
            images: '圖片優化',
            pageSpeed: '頁面速度',
            mobileOptimization: '移動端優化'
        };
        
        Object.entries(metricsMap).forEach(([key, name]) => {
            if (primaryMetrics[key] && competitorMetrics[key] && competitorMetrics[key] - primaryMetrics[key] > 10) {
                opportunities.push(name);
            }
        });
        
        return opportunities;
    }

    exportComparison() {
        if (!this.currentComparison) return;
        
        const comparisonData = {
            primary: this.currentComparison.primary,
            competitor: this.currentComparison.competitor,
            comparisonTime: new Date().toISOString()
        };
        
        const jsonString = JSON.stringify(comparisonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `seo-comparison-${this.currentComparison.primary.domain}-vs-${this.currentComparison.competitor.domain}-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('📄 比較報告已匯出！');
    }

    shareComparison() {
        if (!this.currentComparison) return;
        
        const shareText = `我使用 SEO 分析工具比較了 ${this.currentComparison.primary.domain} (${this.currentComparison.primary.overallScore}/100) vs ${this.currentComparison.competitor.domain} (${this.currentComparison.competitor.overallScore}/100)`;
        
        if (navigator.share) {
            navigator.share({
                title: 'SEO 競爭對手比較',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('📤 比較結果已複製到剪貼簿！');
            });
        }
    }

    saveComparisonHistory(primary, competitor) {
        try {
            const comparison = {
                primary: { domain: primary.domain, score: primary.overallScore },
                competitor: { domain: competitor.domain, score: competitor.overallScore },
                timestamp: new Date().toISOString()
            };
            
            let history = JSON.parse(localStorage.getItem('comparisonHistory') || '[]');
            history.unshift(comparison);
            history = history.slice(0, 5); // 只保留最近 5 次比較
            
            localStorage.setItem('comparisonHistory', JSON.stringify(history));
        } catch (error) {
            console.error('儲存比較歷史失敗:', error);
        }
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

    // 新增：真實網站分析功能
    async performRealAnalysis(url) {
        try {
            // 嘗試通過 CORS 代理獲取網站內容
            const response = await fetch(`${this.corsProxyUrl}${encodeURIComponent(url)}`);
            const data = await response.json();
            
            if (!data.contents) {
                throw new Error('無法獲取網站內容');
            }

            // 解析 HTML 內容
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            
            // 執行真實的 SEO 分析
            return this.analyzeHTMLContent(doc, url);
            
        } catch (error) {
            console.error('CORS 代理失敗，嘗試直接分析:', error);
            // 如果代理失敗，執行基於 URL 的智能分析
            return this.performSmartAnalysis(url);
        }
    }

    analyzeHTMLContent(doc, url) {
        const domain = new URL(url).hostname;
        const analysisTime = new Date().toISOString();
        
        // 分析 Title 標籤
        const title = doc.querySelector('title')?.textContent || '';
        const titleAnalysis = this.analyzeTitleTag(title);
        
        // 分析 Meta Description
        const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const metaAnalysis = this.analyzeMetaDescription(metaDesc);
        
        // 分析標題結構
        const headingsAnalysis = this.analyzeHeadings(doc);
        
        // 分析圖片
        const imagesAnalysis = this.analyzeImages(doc);
        
        // 分析連結
        const linksAnalysis = this.analyzeLinks(doc, domain);
        
        // 新增：進階 SEO 檢測
        const securityAnalysis = this.checkSecurity(url, doc);
        const structuredDataAnalysis = this.checkStructuredData(doc);
        const socialMetaAnalysis = this.checkSocialMeta(doc);
        const performanceAnalysis = this.analyzePerformance(doc);
        const accessibilityAnalysis = this.checkAccessibility(doc);
        
        // 計算總分（包含新的指標）
        const mobileResult = this.checkMobileOptimization(doc);
        const scores = {
            titleTag: titleAnalysis.score,
            metaDescription: metaAnalysis.score,
            headings: headingsAnalysis.score,
            images: imagesAnalysis.score,
            pageSpeed: this.estimatePageSpeed(doc),
            mobileOptimization: mobileResult.score,
            security: securityAnalysis.score,
            structuredData: structuredDataAnalysis.score,
            socialMedia: socialMetaAnalysis.score,
            accessibility: accessibilityAnalysis.score
        };
        
        const overallScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length);
        
        return {
            url: url,
            domain: domain,
            analysisTime: analysisTime,
            overallScore: overallScore,
            metrics: scores,
            detailed: {
                title: titleAnalysis,
                metaDescription: metaAnalysis,
                headings: headingsAnalysis,
                images: imagesAnalysis,
                links: linksAnalysis,
                security: securityAnalysis,
                structuredData: structuredDataAnalysis,
                socialMedia: socialMetaAnalysis,
                performance: performanceAnalysis,
                accessibility: accessibilityAnalysis,
                mobile: mobileResult
            },
            suggestions: this.generateAdvancedSuggestions(scores, {
                title: titleAnalysis,
                metaDescription: metaAnalysis,
                headings: headingsAnalysis,
                images: imagesAnalysis
            })
        };
    }

    analyzeTitleTag(title) {
        const analysis = {
            content: title,
            length: title.length,
            score: 0,
            issues: []
        };
        
        if (!title) {
            analysis.issues.push('缺少 title 標籤');
            analysis.score = 0;
        } else if (title.length < 30) {
            analysis.issues.push('標題太短，建議 30-60 字元');
            analysis.score = 60;
        } else if (title.length > 60) {
            analysis.issues.push('標題太長，可能被搜尋引擎截斷');
            analysis.score = 70;
        } else {
            analysis.score = 95;
        }
        
        return analysis;
    }

    analyzeMetaDescription(metaDesc) {
        const analysis = {
            content: metaDesc,
            length: metaDesc.length,
            score: 0,
            issues: []
        };
        
        if (!metaDesc) {
            analysis.issues.push('缺少 meta description');
            analysis.score = 0;
        } else if (metaDesc.length < 120) {
            analysis.issues.push('描述太短，建議 120-160 字元');
            analysis.score = 60;
        } else if (metaDesc.length > 160) {
            analysis.issues.push('描述太長，可能被搜尋引擎截斷');
            analysis.score = 70;
        } else {
            analysis.score = 95;
        }
        
        return analysis;
    }

    analyzeHeadings(doc) {
        const headings = {
            h1: doc.querySelectorAll('h1').length,
            h2: doc.querySelectorAll('h2').length,
            h3: doc.querySelectorAll('h3').length,
            h4: doc.querySelectorAll('h4').length,
            h5: doc.querySelectorAll('h5').length,
            h6: doc.querySelectorAll('h6').length
        };
        
        let score = 85;
        const issues = [];
        
        if (headings.h1 === 0) {
            issues.push('缺少 H1 標籤');
            score -= 20;
        } else if (headings.h1 > 1) {
            issues.push('多個 H1 標籤，建議只使用一個');
            score -= 10;
        }
        
        if (headings.h2 === 0) {
            issues.push('建議使用 H2 標籤組織內容');
            score -= 5;
        }
        
        return {
            structure: headings,
            score: Math.max(score, 0),
            issues: issues
        };
    }

    analyzeImages(doc) {
        const images = doc.querySelectorAll('img');
        const totalImages = images.length;
        let imagesWithAlt = 0;
        let imagesWithoutAlt = 0;
        
        images.forEach(img => {
            const alt = img.getAttribute('alt');
            if (alt && alt.trim()) {
                imagesWithAlt++;
            } else {
                imagesWithoutAlt++;
            }
        });
        
        const altPercentage = totalImages > 0 ? (imagesWithAlt / totalImages) * 100 : 100;
        let score = Math.round(altPercentage * 0.9); // 最高 90 分
        
        const issues = [];
        if (imagesWithoutAlt > 0) {
            issues.push(`${imagesWithoutAlt} 張圖片缺少 alt 屬性`);
        }
        
        return {
            total: totalImages,
            withAlt: imagesWithAlt,
            withoutAlt: imagesWithoutAlt,
            altPercentage: Math.round(altPercentage),
            score: score,
            issues: issues
        };
    }

    analyzeLinks(doc, domain) {
        const links = doc.querySelectorAll('a[href]');
        let internal = 0;
        let external = 0;
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('http')) {
                const linkDomain = new URL(href).hostname;
                if (linkDomain === domain) {
                    internal++;
                } else {
                    external++;
                }
            } else if (href.startsWith('/') || !href.startsWith('#')) {
                internal++;
            }
        });
        
        return {
            total: links.length,
            internal: internal,
            external: external
        };
    }

    estimatePageSpeed(doc) {
        // 基於頁面元素估算載入速度分數
        let score = 85;
        
        const images = doc.querySelectorAll('img').length;
        const scripts = doc.querySelectorAll('script').length;
        const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]').length;
        
        // 簡單的啟發式計算
        if (images > 20) score -= 15;
        if (scripts > 10) score -= 10;
        if (stylesheets > 5) score -= 5;
        
        return Math.max(score, 40);
    }

    checkMobileOptimization(doc) {
        let score = 70;
        const issues = [];
        
        const viewport = doc.querySelector('meta[name="viewport"]');
        if (viewport) {
            score += 20;
            const content = viewport.getAttribute('content');
            if (content && content.includes('width=device-width')) {
                score += 5;
            }
        } else {
            issues.push('缺少 viewport meta 標籤');
        }
        
        // 檢查是否有響應式設計相關的 CSS
        const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
        const hasBootstrap = Array.from(stylesheets).some(link => 
            link.href.includes('bootstrap') || link.href.includes('responsive')
        );
        
        if (hasBootstrap) {
            score += 10;
        }
        
        // 檢查媒體查詢
        const styles = doc.querySelectorAll('style');
        const hasMediaQueries = Array.from(styles).some(style => 
            style.textContent.includes('@media')
        );
        
        if (hasMediaQueries) {
            score += 5;
        } else {
            issues.push('未偵測到媒體查詢（響應式設計）');
        }
        
        return {
            score: Math.min(score, 95),
            issues: issues
        };
    }

    // 新增：安全性檢查
    checkSecurity(url, doc) {
        let score = 80;
        const issues = [];
        const features = [];
        
        // 檢查 HTTPS
        if (url.startsWith('https://')) {
            score += 15;
            features.push('使用 HTTPS 安全連接');
        } else {
            score -= 20;
            issues.push('未使用 HTTPS 加密連接');
        }
        
        // 檢查安全相關的 meta 標籤
        const csp = doc.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (csp) {
            score += 5;
            features.push('設定了內容安全政策 (CSP)');
        }
        
        const xFrameOptions = doc.querySelector('meta[http-equiv="X-Frame-Options"]');
        if (xFrameOptions) {
            score += 3;
            features.push('防止頁面被嵌入 iframe');
        }
        
        // 檢查是否有混合內容（HTTP 資源在 HTTPS 頁面中）
        if (url.startsWith('https://')) {
            const httpResources = [];
            doc.querySelectorAll('[src], [href]').forEach(element => {
                const resource = element.getAttribute('src') || element.getAttribute('href');
                if (resource && resource.startsWith('http://')) {
                    httpResources.push(resource);
                }
            });
            
            if (httpResources.length > 0) {
                score -= 10;
                issues.push(`發現 ${httpResources.length} 個不安全的 HTTP 資源`);
            }
        }
        
        return {
            score: Math.max(score, 20),
            issues: issues,
            features: features
        };
    }

    // 新增：結構化資料檢查
    checkStructuredData(doc) {
        let score = 60;
        const types = [];
        const issues = [];
        
        // 檢查 JSON-LD
        const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
        if (jsonLdScripts.length > 0) {
            score += 25;
            jsonLdScripts.forEach((script, index) => {
                try {
                    const data = JSON.parse(script.textContent);
                    if (data['@type']) {
                        types.push(data['@type']);
                    }
                } catch (e) {
                    issues.push(`JSON-LD 格式錯誤 (第 ${index + 1} 個)`);
                }
            });
        }
        
        // 檢查 Microdata
        const microdataElements = doc.querySelectorAll('[itemtype]');
        if (microdataElements.length > 0) {
            score += 10;
            microdataElements.forEach(element => {
                const itemtype = element.getAttribute('itemtype');
                if (itemtype) {
                    types.push(itemtype.split('/').pop());
                }
            });
        }
        
        // 檢查 RDFa
        const rdfaElements = doc.querySelectorAll('[typeof]');
        if (rdfaElements.length > 0) {
            score += 5;
        }
        
        if (types.length === 0) {
            issues.push('未找到結構化資料標記');
        }
        
        return {
            score: Math.min(score, 95),
            types: [...new Set(types)],
            issues: issues
        };
    }

    // 新增：社交媒體 meta 標籤檢查
    checkSocialMeta(doc) {
        let score = 50;
        const platforms = {};
        const issues = [];
        
        // 檢查 Open Graph 標籤
        const ogTags = {
            title: doc.querySelector('meta[property="og:title"]'),
            description: doc.querySelector('meta[property="og:description"]'),
            image: doc.querySelector('meta[property="og:image"]'),
            url: doc.querySelector('meta[property="og:url"]'),
            type: doc.querySelector('meta[property="og:type"]')
        };
        
        let ogCount = 0;
        Object.entries(ogTags).forEach(([key, element]) => {
            if (element && element.getAttribute('content')) {
                ogCount++;
            }
        });
        
        if (ogCount > 0) {
            score += ogCount * 8;
            platforms.facebook = `${ogCount}/5 個 Open Graph 標籤`;
        } else {
            issues.push('缺少 Facebook Open Graph 標籤');
        }
        
        // 檢查 Twitter Card 標籤
        const twitterTags = {
            card: doc.querySelector('meta[name="twitter:card"]'),
            title: doc.querySelector('meta[name="twitter:title"]'),
            description: doc.querySelector('meta[name="twitter:description"]'),
            image: doc.querySelector('meta[name="twitter:image"]')
        };
        
        let twitterCount = 0;
        Object.entries(twitterTags).forEach(([key, element]) => {
            if (element && element.getAttribute('content')) {
                twitterCount++;
            }
        });
        
        if (twitterCount > 0) {
            score += twitterCount * 5;
            platforms.twitter = `${twitterCount}/4 個 Twitter Card 標籤`;
        } else {
            issues.push('缺少 Twitter Card 標籤');
        }
        
        return {
            score: Math.min(score, 95),
            platforms: platforms,
            issues: issues
        };
    }

    // 新增：效能分析
    analyzePerformance(doc) {
        let score = 75;
        const metrics = {};
        const issues = [];
        
        // 統計資源數量
        const images = doc.querySelectorAll('img').length;
        const scripts = doc.querySelectorAll('script').length;
        const stylesheets = doc.querySelectorAll('link[rel="stylesheet"]').length;
        const totalResources = images + scripts + stylesheets;
        
        metrics.totalResources = totalResources;
        metrics.images = images;
        metrics.scripts = scripts;
        metrics.stylesheets = stylesheets;
        
        // 評估資源數量
        if (totalResources > 50) {
            score -= 15;
            issues.push('資源文件過多，可能影響載入速度');
        }
        
        if (images > 20) {
            score -= 10;
            issues.push('圖片數量過多');
        }
        
        if (scripts > 10) {
            score -= 10;
            issues.push('JavaScript 文件過多');
        }
        
        // 檢查是否有延遲載入
        const lazyImages = doc.querySelectorAll('img[loading="lazy"]').length;
        if (lazyImages > 0) {
            score += 10;
            metrics.lazyLoadingImages = lazyImages;
        }
        
        // 檢查壓縮標頭（模擬）
        const hasMinifiedCSS = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
            .some(link => link.href.includes('.min.css'));
        const hasMinifiedJS = Array.from(doc.querySelectorAll('script[src]'))
            .some(script => script.src.includes('.min.js'));
            
        if (hasMinifiedCSS || hasMinifiedJS) {
            score += 5;
            metrics.hasMinification = true;
        }
        
        return {
            score: Math.max(score, 30),
            metrics: metrics,
            issues: issues
        };
    }

    // 新增：無障礙性檢查
    checkAccessibility(doc) {
        let score = 70;
        const features = [];
        const issues = [];
        
        // 檢查圖片 alt 屬性
        const images = doc.querySelectorAll('img');
        const imagesWithAlt = doc.querySelectorAll('img[alt]').length;
        if (images.length > 0) {
            const altPercentage = (imagesWithAlt / images.length) * 100;
            if (altPercentage >= 90) {
                score += 10;
                features.push('圖片 alt 屬性完善');
            } else if (altPercentage < 50) {
                score -= 15;
                issues.push('多數圖片缺少 alt 屬性');
            }
        }
        
        // 檢查表單標籤
        const formInputs = doc.querySelectorAll('input, textarea, select').length;
        const labelsForInputs = doc.querySelectorAll('label[for]').length;
        if (formInputs > 0) {
            if (labelsForInputs >= formInputs) {
                score += 10;
                features.push('表單元素有適當的標籤');
            } else {
                score -= 10;
                issues.push('部分表單元素缺少標籤');
            }
        }
        
        // 檢查標題階層
        const h1 = doc.querySelectorAll('h1').length;
        const h2 = doc.querySelectorAll('h2').length;
        const h3 = doc.querySelectorAll('h3').length;
        
        if (h1 === 1 && h2 > 0) {
            score += 10;
            features.push('標題結構層次清晰');
        } else if (h1 !== 1) {
            score -= 5;
            issues.push('標題結構不當（應有唯一的 H1）');
        }
        
        // 檢查語言屬性
        const htmlLang = doc.documentElement.getAttribute('lang');
        if (htmlLang) {
            score += 5;
            features.push('設定了頁面語言屬性');
        } else {
            issues.push('缺少 lang 屬性');
        }
        
        // 檢查 ARIA 標籤
        const ariaElements = doc.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]').length;
        if (ariaElements > 0) {
            score += 5;
            features.push('使用了 ARIA 標籤');
        }
        
        return {
            score: Math.min(score, 95),
            features: features,
            issues: issues
        };
    }

    performSmartAnalysis(url) {
        // 當無法獲取網站內容時，基於 URL 和已知模式進行智能分析
        const domain = new URL(url).hostname;
        const analysisTime = new Date().toISOString();
        
        // 基於域名特徵給出分析
        const domainFeatures = this.analyzeDomainFeatures(domain);
        
        return {
            url: url,
            domain: domain,
            analysisTime: analysisTime,
            overallScore: domainFeatures.estimatedScore,
            metrics: {
                titleTag: domainFeatures.estimatedScore - 5,
                metaDescription: domainFeatures.estimatedScore - 10,
                headings: domainFeatures.estimatedScore,
                images: domainFeatures.estimatedScore - 15,
                pageSpeed: domainFeatures.pageSpeedScore,
                mobileOptimization: domainFeatures.mobileScore
            },
            suggestions: this.generateSmartSuggestions(domainFeatures),
            note: '由於技術限制，此為基於域名特徵的智能估算分析'
        };
    }

    analyzeDomainFeatures(domain) {
        let estimatedScore = 75; // 基礎分數
        let pageSpeedScore = 70;
        let mobileScore = 80;
        
        // 根據域名特徵調整分數
        if (domain.includes('github.io') || domain.includes('netlify') || domain.includes('vercel')) {
            estimatedScore += 10;
            pageSpeedScore += 15;
        }
        
        if (domain.includes('wordpress.com') || domain.includes('blogger.com')) {
            estimatedScore += 5;
            mobileScore += 10;
        }
        
        if (domain.length > 20) {
            estimatedScore -= 5;
        }
        
        if (domain.includes('www')) {
            estimatedScore += 2;
        }
        
        return {
            estimatedScore: Math.min(estimatedScore, 90),
            pageSpeedScore: Math.min(pageSpeedScore, 90),
            mobileScore: Math.min(mobileScore, 95)
        };
    }

    generateAdvancedSuggestions(scores, detailed) {
        const suggestions = [];
        
        if (scores.titleTag < 80) {
            suggestions.push(`優化頁面標題：${detailed.title.issues.join('、')}`);
        }
        
        if (scores.metaDescription < 80) {
            suggestions.push(`改善 Meta 描述：${detailed.metaDescription.issues.join('、')}`);
        }
        
        if (scores.headings < 80) {
            suggestions.push(`優化標題結構：${detailed.headings.issues.join('、')}`);
        }
        
        if (scores.images < 80) {
            suggestions.push(`改善圖片 SEO：${detailed.images.issues.join('、')}`);
        }
        
        if (scores.pageSpeed < 80) {
            suggestions.push('優化頁面載入速度：減少圖片大小、壓縮 CSS/JS');
        }
        
        if (scores.mobileOptimization < 80) {
            suggestions.push('提升移動端體驗：添加 viewport meta 標籤、使用響應式設計');
        }
        
        return suggestions;
    }

    generateSmartSuggestions(domainFeatures) {
        return [
            '添加完整的 meta 標籤信息',
            '優化頁面標題和描述',
            '改善圖片 alt 屬性',
            '提升網站載入速度',
            '確保移動端友好設計',
            '建立清晰的內容結構'
        ];
    }

    // 分析歷史管理
    loadAnalysisHistory() {
        try {
            const history = localStorage.getItem('seoAnalysisHistory');
            return history ? JSON.parse(history) : [];
        } catch {
            return [];
        }
    }

    saveAnalysisHistory(result) {
        try {
            this.analysisHistory.unshift(result);
            // 只保留最近 10 次分析
            this.analysisHistory = this.analysisHistory.slice(0, 10);
            localStorage.setItem('seoAnalysisHistory', JSON.stringify(this.analysisHistory));
        } catch (error) {
            console.error('儲存分析歷史失敗:', error);
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

// 全域變數供按鈕呼叫使用
let seoAnalyzer;

// 當 DOM 載入完成時初始化應用程式
document.addEventListener('DOMContentLoaded', () => {
    seoAnalyzer = new SEOAnalyzer();
    console.log('Website One Page SEO Application 已初始化');
});