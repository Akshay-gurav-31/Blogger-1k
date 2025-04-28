function openTabs() {
    const url = document.getElementById('bloggerUrl').value;
    const tabCount = parseInt(document.getElementById('tabCount').value);

    if (!url || tabCount <= 0 || tabCount > 1000) {
        alert("Please enter a valid URL and a number between 1 and 1000.");
        return;
    }

    // Warning for large tab counts
    if (tabCount > 100) {
        if (!confirm(`Opening ${tabCount} tabs may slow down or crash your browser. Continue?`)) {
            return;
        }
    }

    const openedTabs = [];
    const batchSize = 50; // Open 50 tabs at a time
    const delayBetweenBatches = 1000; // 1 second delay between batches
    let tabsOpened = 0;

    function openBatch(start, end) {
        for (let i = start; i < end && i < tabCount; i++) {
            const newTab = window.open(url, '_blank');
            if (newTab) {
                openedTabs.push(newTab);
            }
        }
    }

    // Open tabs in batches
    for (let i = 0; i < tabCount; i += batchSize) {
        setTimeout(() => {
            openBatch(i, i + batchSize);
        }, (i / batchSize) * delayBetweenBatches);
        tabsOpened = Math.min(i + batchSize, tabCount);
    }

    // Close all tabs after 60 seconds
    setTimeout(() => {
        openedTabs.forEach(tab => {
            if (tab && !tab.closed) {
                tab.close();
            }
        });
    }, 60000); // 1 minute
}   