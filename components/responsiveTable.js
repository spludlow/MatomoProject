(function () {
    const testData = {
        "data": [
            {
                "dimension": {
                    "device": "Desktop",
                    "browser": "Chrome"
                },
                "metrics": [
                    {
                        "title": "Visits",
                        "value": 12345,
                        "trend": "+15%"
                    },
                    {
                        "title": "Bounce Rate",
                        "value": 0.08,
                        "trend": "+15%"
                    }
                ]
            },
            {
                "dimension": {
                    "device": "Mobile",
                    "browser": "Safari"
                },
                "metrics": [
                    {
                        "title": "Visits",
                        "value": 6789,
                        "trend": "-5%"
                    },
                    {
                        "title": "Bounce Rate",
                        "value": 0.12,
                        "trend": "-2%"
                    }
                ]
            },
            {
                "dimension": {
                    "device": "",
                    "browser": ""
                },
                "metrics": [
                    {
                        "title": "Visits",
                        "value": 0,
                        "trend": ""
                    },
                    {
                        "title": "Bounce Rate",
                        "value": "",
                        "trend": ""
                    }
                ]
            }
        ]
    }

    function onChange(event) {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event) {
        var obj = JSON.parse(event.target.result);
        loadData(obj);
    }

    function loadData(obj) {
        const data = obj.data;
        let dimensions = {};
        const root = document.getElementById('table-root');
        // DESKTOP TABLE
        const table = document.createElement("table");
        table.classList.add('desktop-table');
        // assume each row object has the same schema, i.e. dimensions and metrics
        data.forEach((rowData, i) => {
            if (i === 0) {
                // build header row;
                const header = document.createElement("thead");
                // dimensions
                dimensions = Object.keys(rowData.dimension);
                dimensions.forEach((key) => {
                    const headerDim = document.createElement("th");
                    headerDim.classList.add('title');
                    headerDim.innerHTML = key;
                    header.appendChild(headerDim);
                });
                // metrics
                rowData.metrics.forEach((metric) => {
                    const headerMetric = document.createElement("th");
                    headerMetric.classList.add('title');
                    headerMetric.innerHTML = metric.title;
                    header.appendChild(headerMetric);
                });
                const headerSpacer = document.createElement("th");
                header.appendChild(headerSpacer);
                table.appendChild(header);
            }
            const row = document.createElement("tr");
            // add dimensions
            dimensions.forEach((key) => {
                const dim = document.createElement("td");
                dim.innerHTML = rowData.dimension[key] || '-';
                row.appendChild(dim);
            });
            // add metrics
            rowData.metrics.forEach((metric) => {
                const met = document.createElement("td");
                met.innerHTML = createMetric(metric);
                row.appendChild(met);
            })
            const rowSpacer = document.createElement("td");
            row.appendChild(rowSpacer);
            table.appendChild(row);
        })

        // MOBILE TABLE
        const mobileTable = document.createElement("table");
        mobileTable.classList.add('mobile-table')
        data.forEach((rowData, i) => {
            const isOdd = i % 2 !== 0;
            // add dimension rows
            dimensions.forEach((key) => {
                const row = document.createElement("tr");
                row.classList.add(isOdd ? 'odd-row' : 'even-row');
                const dimTitle = document.createElement("td");
                dimTitle.classList.add('title');
                dimTitle.innerHTML = key;
                row.appendChild(dimTitle);
                const dimValue = document.createElement("td");
                dimValue.classList.add('value');
                dimValue.innerHTML = rowData.dimension[key] || '-';
                row.appendChild(dimValue);
                mobileTable.appendChild(row);
            });
            // add metric rows
            rowData.metrics.forEach((metric) => {
                const row = document.createElement("tr");
                row.classList.add(isOdd ? 'odd-row' : 'even-row');
                const metTitle = document.createElement("td");
                metTitle.classList.add('title');
                metTitle.innerHTML = metric.title;
                row.appendChild(metTitle);
                const met = document.createElement("td");
                met.classList.add('value');
                met.innerHTML = createMetric(metric);
                row.appendChild(met);
                mobileTable.appendChild(row);
            })
        })


        while (root.firstChild) {
            root.removeChild(root.firstChild)
        }
        root.appendChild(table);
        root.appendChild(mobileTable);
    }

    function numberWithCommas(x) {
        return x?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    function createMetric(metric) {
        const neg = metric.trend?.includes("-");
        const pos = metric.trend?.includes("+");
        let trendClass = "flat-trend";
        let trendSymb = "<div role='img' alt='flat trend' class='flat-shape'></div>";
        if (neg) {
            trendClass = "neg-trend";
            trendSymb = "<div role='img' alt='negative trend' class='neg-shape'></div>";
        } else if (pos) {
            metric.trend.replace("+", "");
            trendClass = "pos-trend";
            trendSymb = "<div role='img' alt='positive trend' class='pos-shape'></div>";
        }
        const metricSpan = `<div class="metric">
        <span>${numberWithCommas(metric.value) || '-'}</span>
        <div class="shape">${trendSymb}</div>
        <span class="${trendClass}">${metric.trend}</span>
        </div>`;
        return metricSpan;
    }

    loadData(testData);

    document.getElementById('upload-test-data').addEventListener('change', onChange);

}());
