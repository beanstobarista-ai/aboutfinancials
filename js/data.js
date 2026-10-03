/* Embedded at build time from public APIs. Figures are copied from those responses, not estimated. */
window.AF = {
  "builtAt": "2026-10-03T13:30:47+03:00",
  "builtAtLabel": "1:30 PM on 3 October 2026",
  "countries": [
    {
      "code": "SA",
      "name": "Saudi Arabia",
      "aliases": [
        "saudi",
        "ksa",
        "riyadh"
      ]
    },
    {
      "code": "US",
      "name": "United States",
      "aliases": [
        "usa",
        "america",
        "united states"
      ]
    },
    {
      "code": "CN",
      "name": "China",
      "aliases": [
        "china",
        "chinese"
      ]
    },
    {
      "code": "DE",
      "name": "Germany",
      "aliases": [
        "germany",
        "german"
      ]
    },
    {
      "code": "IN",
      "name": "India",
      "aliases": [
        "india"
      ]
    },
    {
      "code": "JP",
      "name": "Japan",
      "aliases": [
        "japan"
      ]
    },
    {
      "code": "GB",
      "name": "United Kingdom",
      "aliases": [
        "uk",
        "britain",
        "united kingdom"
      ]
    },
    {
      "code": "AE",
      "name": "United Arab Emirates",
      "aliases": [
        "uae",
        "emirates",
        "dubai",
        "abu dhabi"
      ]
    },
    {
      "code": "FR",
      "name": "France",
      "aliases": [
        "france",
        "french"
      ]
    },
    {
      "code": "KR",
      "name": "South Korea",
      "aliases": [
        "korea",
        "south korea",
        "republic of korea"
      ]
    },
    {
      "code": "BR",
      "name": "Brazil",
      "aliases": [
        "brazil",
        "brasil"
      ]
    },
    {
      "code": "CA",
      "name": "Canada",
      "aliases": [
        "canada"
      ]
    },
    {
      "code": "AU",
      "name": "Australia",
      "aliases": [
        "australia"
      ]
    },
    {
      "code": "ZA",
      "name": "South Africa",
      "aliases": [
        "south africa"
      ]
    },
    {
      "code": "TR",
      "name": "Türkiye",
      "aliases": [
        "turkey",
        "turkiye",
        "türkiye"
      ]
    },
    {
      "code": "ID",
      "name": "Indonesia",
      "aliases": [
        "indonesia"
      ]
    },
    {
      "code": "MX",
      "name": "Mexico",
      "aliases": [
        "mexico"
      ]
    }
  ],
  "categories": [
    {
      "id": "gdp",
      "name": "GDP",
      "summary": "How large the economy is, and whether it grew after inflation."
    },
    {
      "id": "prices",
      "name": "Prices",
      "summary": "How fast the cost of a typical basket of goods and services rose."
    },
    {
      "id": "jobs",
      "name": "Jobs",
      "summary": "How many people are out of work, and how many are in the labor force."
    },
    {
      "id": "trade",
      "name": "Trade",
      "summary": "What crosses the border, and the broader current-account balance with the world."
    },
    {
      "id": "money",
      "name": "Money",
      "summary": "Money in the economy, and interest rates after inflation, where the source published them."
    },
    {
      "id": "government",
      "name": "Government",
      "summary": "Debt, revenue, taxes, and whether the budget was in surplus or deficit."
    }
  ],
  "indicators": [
    {
      "id": "NY.GDP.MKTP.CD",
      "category": "gdp",
      "unit": "usd",
      "name": "GDP",
      "officialName": "GDP (current US$)",
      "plain": "The value of goods and services produced that year, in current US dollars. It is not adjusted for inflation.",
      "short": "Size of the economy, current US dollars",
      "keywords": [
        "gdp",
        "economy",
        "output",
        "size"
      ]
    },
    {
      "id": "NY.GDP.PCAP.CD",
      "category": "gdp",
      "unit": "usd_pc",
      "name": "GDP per person",
      "officialName": "GDP per capita (current US$)",
      "plain": "The same GDP divided by population. It is an average of output, not a typical salary.",
      "short": "Output per person, not a salary",
      "keywords": [
        "gdp per capita",
        "per person",
        "income"
      ]
    },
    {
      "id": "NY.GDP.MKTP.KD.ZG",
      "category": "gdp",
      "unit": "pct",
      "name": "GDP growth",
      "officialName": "GDP growth (annual %)",
      "plain": "How much real GDP changed from the year before. Inflation is already taken out.",
      "short": "After inflation, versus the year before",
      "keywords": [
        "growth",
        "real gdp",
        "expansion"
      ]
    },
    {
      "id": "FP.CPI.TOTL.ZG",
      "category": "prices",
      "unit": "pct",
      "name": "Inflation",
      "officialName": "Inflation, consumer prices (annual %)",
      "plain": "How much consumer prices rose over the year, measured by the consumer price index.",
      "short": "Rise in consumer prices",
      "keywords": [
        "inflation",
        "cpi",
        "prices",
        "cost of living"
      ]
    },
    {
      "id": "SL.UEM.TOTL.ZS",
      "category": "jobs",
      "unit": "pct",
      "name": "Unemployment",
      "officialName": "Unemployment, total (% of total labor force) (modeled ILO estimate)",
      "plain": "The share of the labor force without a job and looking for one. This is the ILO modeled estimate, not a raw national survey.",
      "short": "Share of the labor force out of work",
      "keywords": [
        "unemployment",
        "jobs",
        "jobless"
      ]
    },
    {
      "id": "SL.TLF.CACT.ZS",
      "category": "jobs",
      "unit": "pct",
      "name": "Labor force participation",
      "officialName": "Labor force participation rate, total (% of total population ages 15+) (modeled ILO estimate)",
      "plain": "The share of people aged 15 and older who are working or looking for work. ILO modeled estimate.",
      "short": "Share of people 15+ working or looking",
      "keywords": [
        "participation",
        "labor force",
        "labour"
      ]
    },
    {
      "id": "NE.EXP.GNFS.ZS",
      "category": "trade",
      "unit": "pct",
      "name": "Exports",
      "officialName": "Exports of goods and services (% of GDP)",
      "plain": "Goods and services sold abroad, as a share of the economy. A higher number means exports are large relative to GDP, not that the country earns more dollars than a bigger economy.",
      "short": "Exports as a share of the economy",
      "keywords": [
        "exports",
        "trade"
      ]
    },
    {
      "id": "NE.IMP.GNFS.ZS",
      "category": "trade",
      "unit": "pct",
      "name": "Imports",
      "officialName": "Imports of goods and services (% of GDP)",
      "plain": "Goods and services bought from abroad, as a share of the economy.",
      "short": "Imports as a share of the economy",
      "keywords": [
        "imports",
        "trade"
      ]
    },
    {
      "id": "BN.CAB.XOKA.GD.ZS",
      "category": "trade",
      "unit": "pct",
      "signWords": true,
      "name": "Current account",
      "officialName": "Current account balance (% of GDP)",
      "plain": "The broad balance of trade, income, and transfers with the rest of the world, as a share of GDP. Above zero is a surplus. Below zero is a deficit.",
      "short": "Surplus or deficit with the rest of the world",
      "keywords": [
        "current account",
        "surplus",
        "deficit",
        "balance of payments"
      ]
    },
    {
      "id": "FM.LBL.BMNY.GD.ZS",
      "category": "money",
      "unit": "pct",
      "name": "Broad money",
      "officialName": "Broad money (% of GDP)",
      "plain": "Cash and liquid deposits compared with one year of GDP. The World Bank’s latest row is empty for several countries here, so those cells are left blank.",
      "short": "Money supply compared with GDP",
      "keywords": [
        "money",
        "broad money",
        "m2",
        "liquidity"
      ]
    },
    {
      "id": "FR.INR.RINR",
      "category": "money",
      "unit": "pct",
      "name": "Real interest rate",
      "officialName": "Real interest rate (%)",
      "plain": "A lending rate after inflation. In this snapshot the World Bank published a latest value for only one of the seven countries.",
      "short": "Lending rate after inflation",
      "keywords": [
        "interest",
        "real rate",
        "rates"
      ]
    },
    {
      "id": "GC.DOD.TOTL.GD.ZS",
      "category": "government",
      "unit": "pct",
      "name": "Government debt",
      "officialName": "Central government debt, total (% of GDP)",
      "plain": "What the central government owes, compared with one year of GDP. Many countries have no value in the latest World Bank row.",
      "short": "Central government debt versus GDP",
      "keywords": [
        "debt",
        "borrowing",
        "government"
      ]
    },
    {
      "id": "GC.REV.XGRT.GD.ZS",
      "category": "government",
      "unit": "pct",
      "name": "Government revenue",
      "officialName": "Revenue, excluding grants (% of GDP)",
      "plain": "Money the government takes in, not counting grants, compared with the size of the economy.",
      "short": "Revenue, excluding grants, versus GDP",
      "keywords": [
        "revenue",
        "government",
        "budget"
      ]
    },
    {
      "id": "GC.NLD.TOTL.GD.ZS",
      "category": "government",
      "unit": "pct",
      "signWords": true,
      "name": "Budget balance",
      "officialName": "Net lending (+) / net borrowing (−) (% of GDP)",
      "plain": "Whether the government ended the year lending (above zero) or borrowing (below zero), as a share of GDP.",
      "short": "Surplus or deficit as a share of GDP",
      "keywords": [
        "deficit",
        "surplus",
        "budget",
        "balance",
        "fiscal"
      ]
    },
    {
      "id": "GC.TAX.TOTL.GD.ZS",
      "category": "government",
      "unit": "pct",
      "name": "Tax revenue",
      "officialName": "Tax revenue (% of GDP)",
      "plain": "Taxes collected, compared with the size of the economy. Grants and some other revenue are not in this figure.",
      "short": "Taxes compared with GDP",
      "keywords": [
        "tax",
        "taxes",
        "revenue"
      ]
    }
  ],
  "series": {
    "NY.GDP.MKTP.CD": {
      "SA": {
        "date": "2025",
        "value": "1276942933333.33"
      },
      "US": {
        "date": "2025",
        "value": "30769700000000"
      },
      "CN": {
        "date": "2025",
        "value": "19498039388042.6"
      },
      "DE": {
        "date": "2025",
        "value": "5050922925047.05"
      },
      "IN": {
        "date": "2025",
        "value": "3956067115771.63"
      },
      "JP": {
        "date": "2025",
        "value": "4435162999976.94"
      },
      "GB": {
        "date": "2025",
        "value": "4002587541846.01"
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": "3366315927447.33"
      },
      "KR": {
        "date": "2025",
        "value": "1872374961553.15"
      },
      "BR": {
        "date": "2025",
        "value": "2279920092492.13"
      },
      "CA": {
        "date": "2025",
        "value": "2319899772425.92"
      },
      "AU": {
        "date": "2025",
        "value": "1798518933689.21"
      },
      "ZA": {
        "date": "2025",
        "value": "427184325997.307"
      },
      "TR": {
        "date": "2025",
        "value": "1597293229287"
      },
      "ID": {
        "date": "2025",
        "value": "1445642584163.81"
      },
      "MX": {
        "date": "2025",
        "value": "1832641364775.52"
      }
    },
    "NY.GDP.PCAP.CD": {
      "SA": {
        "date": "2025",
        "value": "34536.6555456551"
      },
      "US": {
        "date": "2025",
        "value": "90026.5163005744"
      },
      "CN": {
        "date": "2025",
        "value": "13861.970224368"
      },
      "DE": {
        "date": "2025",
        "value": "60496.4350820414"
      },
      "IN": {
        "date": "2025",
        "value": "2702.47987141553"
      },
      "JP": {
        "date": "2025",
        "value": "35951.0449549304"
      },
      "GB": {
        "date": "2025",
        "value": "57601.9621201954"
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": "48985.7307807924"
      },
      "KR": {
        "date": "2025",
        "value": "36226.9663637512"
      },
      "BR": {
        "date": "2025",
        "value": "10713.2856869511"
      },
      "CA": {
        "date": "2025",
        "value": "55697.6639660837"
      },
      "AU": {
        "date": "2025",
        "value": "65129.7227990563"
      },
      "ZA": {
        "date": "2025",
        "value": "6597.71450918774"
      },
      "TR": {
        "date": "2025",
        "value": "18599.4420922378"
      },
      "ID": {
        "date": "2025",
        "value": "5059.62596411213"
      },
      "MX": {
        "date": "2025",
        "value": "13889.2339628708"
      }
    },
    "NY.GDP.MKTP.KD.ZG": {
      "SA": {
        "date": "2025",
        "value": "4.50246560191663"
      },
      "US": {
        "date": "2025",
        "value": "2.16138195623856"
      },
      "CN": {
        "date": "2025",
        "value": "4.95994886240992"
      },
      "DE": {
        "date": "2025",
        "value": "0.239578342117881"
      },
      "IN": {
        "date": "2025",
        "value": "7.56666179284244"
      },
      "JP": {
        "date": "2025",
        "value": "1.19311288444599"
      },
      "GB": {
        "date": "2025",
        "value": "1.38844207858726"
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": "0.840949955479587"
      },
      "KR": {
        "date": "2025",
        "value": "1.00701840291242"
      },
      "BR": {
        "date": "2025",
        "value": "2.2857464902475"
      },
      "CA": {
        "date": "2025",
        "value": "1.74268536175708"
      },
      "AU": {
        "date": "2025",
        "value": "1.35039785076631"
      },
      "ZA": {
        "date": "2025",
        "value": "1.11462608103956"
      },
      "TR": {
        "date": "2025",
        "value": "3.60462514082589"
      },
      "ID": {
        "date": "2025",
        "value": "5.10808904438025"
      },
      "MX": {
        "date": "2025",
        "value": "0.561683456144578"
      }
    },
    "FP.CPI.TOTL.ZG": {
      "SA": {
        "date": "2025",
        "value": "2.08420853585036"
      },
      "US": {
        "date": "2025",
        "value": null
      },
      "CN": {
        "date": "2025",
        "value": "0.0595646916565403"
      },
      "DE": {
        "date": "2025",
        "value": "2.17178770949721"
      },
      "IN": {
        "date": "2025",
        "value": "2.39884954182294"
      },
      "JP": {
        "date": "2025",
        "value": "3.17253034260248"
      },
      "GB": {
        "date": "2025",
        "value": "3.88306881626"
      },
      "AE": {
        "date": "2025",
        "value": "1.250865245598"
      },
      "FR": {
        "date": "2025",
        "value": "0.943770212469976"
      },
      "KR": {
        "date": "2025",
        "value": "2.12309421458659"
      },
      "BR": {
        "date": "2025",
        "value": "5.01675279604836"
      },
      "CA": {
        "date": "2025",
        "value": "2.07232411149103"
      },
      "AU": {
        "date": "2025",
        "value": "2.87403791660173"
      },
      "ZA": {
        "date": "2025",
        "value": "3.20550474112603"
      },
      "TR": {
        "date": "2025",
        "value": "34.8811629820306"
      },
      "ID": {
        "date": "2025",
        "value": "1.9133344329508"
      },
      "MX": {
        "date": "2025",
        "value": "3.80668650726485"
      }
    },
    "SL.UEM.TOTL.ZS": {
      "SA": {
        "date": "2025",
        "value": "3.038"
      },
      "US": {
        "date": "2025",
        "value": "4.198"
      },
      "CN": {
        "date": "2025",
        "value": "4.615"
      },
      "DE": {
        "date": "2025",
        "value": "3.711"
      },
      "IN": {
        "date": "2025",
        "value": "4.219"
      },
      "JP": {
        "date": "2025",
        "value": "2.451"
      },
      "GB": {
        "date": "2025",
        "value": "4.746"
      },
      "AE": {
        "date": "2025",
        "value": "2.174"
      },
      "FR": {
        "date": "2025",
        "value": "7.542"
      },
      "KR": {
        "date": "2025",
        "value": "2.683"
      },
      "BR": {
        "date": "2025",
        "value": "5.97"
      },
      "CA": {
        "date": "2025",
        "value": "6.907"
      },
      "AU": {
        "date": "2025",
        "value": "4.09"
      },
      "ZA": {
        "date": "2025",
        "value": "32.391"
      },
      "TR": {
        "date": "2025",
        "value": "8.52"
      },
      "ID": {
        "date": "2025",
        "value": "3.237"
      },
      "MX": {
        "date": "2025",
        "value": "2.673"
      }
    },
    "SL.TLF.CACT.ZS": {
      "SA": {
        "date": "2025",
        "value": "65.098"
      },
      "US": {
        "date": "2025",
        "value": "61.704"
      },
      "CN": {
        "date": "2025",
        "value": "64.551"
      },
      "DE": {
        "date": "2025",
        "value": "60.571"
      },
      "IN": {
        "date": "2025",
        "value": "55.658"
      },
      "JP": {
        "date": "2025",
        "value": "63.448"
      },
      "GB": {
        "date": "2025",
        "value": "61.369"
      },
      "AE": {
        "date": "2025",
        "value": "78.594"
      },
      "FR": {
        "date": "2025",
        "value": "55.346"
      },
      "KR": {
        "date": "2025",
        "value": "64.351"
      },
      "BR": {
        "date": "2025",
        "value": "63.139"
      },
      "CA": {
        "date": "2025",
        "value": "64.516"
      },
      "AU": {
        "date": "2025",
        "value": "66.537"
      },
      "ZA": {
        "date": "2025",
        "value": "55.584"
      },
      "TR": {
        "date": "2025",
        "value": "54.379"
      },
      "ID": {
        "date": "2025",
        "value": "67.965"
      },
      "MX": {
        "date": "2025",
        "value": "61.609"
      }
    },
    "NE.EXP.GNFS.ZS": {
      "SA": {
        "date": "2025",
        "value": "29.7448740074211"
      },
      "US": {
        "date": "2025",
        "value": null
      },
      "CN": {
        "date": "2025",
        "value": "21.0711983566772"
      },
      "DE": {
        "date": "2025",
        "value": "40.4347738545071"
      },
      "IN": {
        "date": "2025",
        "value": "22.2630410669804"
      },
      "JP": {
        "date": "2025",
        "value": null
      },
      "GB": {
        "date": "2025",
        "value": "30.5969582161816"
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": "33.3928225145364"
      },
      "KR": {
        "date": "2025",
        "value": "45.7630385215931"
      },
      "BR": {
        "date": "2025",
        "value": "17.8207228961707"
      },
      "CA": {
        "date": "2025",
        "value": "31.3323868147182"
      },
      "AU": {
        "date": "2025",
        "value": "23.2444383508997"
      },
      "ZA": {
        "date": "2025",
        "value": "31.4101947337253"
      },
      "TR": {
        "date": "2025",
        "value": "24.8497719904256"
      },
      "ID": {
        "date": "2025",
        "value": "22.8465482987858"
      },
      "MX": {
        "date": "2025",
        "value": "39.6453397926899"
      }
    },
    "NE.IMP.GNFS.ZS": {
      "SA": {
        "date": "2025",
        "value": "28.1733498505598"
      },
      "US": {
        "date": "2025",
        "value": null
      },
      "CN": {
        "date": "2025",
        "value": "16.8851895085539"
      },
      "DE": {
        "date": "2025",
        "value": "38.0780373654056"
      },
      "IN": {
        "date": "2025",
        "value": "24.0051596190103"
      },
      "JP": {
        "date": "2025",
        "value": null
      },
      "GB": {
        "date": "2025",
        "value": "31.8603712472379"
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": "33.7995547693485"
      },
      "KR": {
        "date": "2025",
        "value": "40.5985621226499"
      },
      "BR": {
        "date": "2025",
        "value": "17.4707593653367"
      },
      "CA": {
        "date": "2025",
        "value": "32.1781181545045"
      },
      "AU": {
        "date": "2025",
        "value": "22.6570110371129"
      },
      "ZA": {
        "date": "2025",
        "value": "29.5009024056375"
      },
      "TR": {
        "date": "2025",
        "value": "25.0849063722672"
      },
      "ID": {
        "date": "2025",
        "value": "20.5446587523346"
      },
      "MX": {
        "date": "2025",
        "value": "40.2786127888756"
      }
    },
    "BN.CAB.XOKA.GD.ZS": {
      "SA": {
        "date": "2025",
        "value": "-2.56365940191401"
      },
      "US": {
        "date": "2025",
        "value": "-3.62698693844919"
      },
      "CN": {
        "date": "2025",
        "value": "3.76972243689338"
      },
      "DE": {
        "date": "2025",
        "value": "4.50585617378113"
      },
      "IN": {
        "date": "2025",
        "value": "-0.416854153498652"
      },
      "JP": {
        "date": "2025",
        "value": "4.86496093471918"
      },
      "GB": {
        "date": "2025",
        "value": "-2.42693271936225"
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": "-0.274343403515968"
      },
      "KR": {
        "date": "2025",
        "value": "6.57207036660681"
      },
      "BR": {
        "date": "2025",
        "value": "-2.92630139201733"
      },
      "CA": {
        "date": "2025",
        "value": "-0.948637766653122"
      },
      "AU": {
        "date": "2025",
        "value": "-2.68119524894682"
      },
      "ZA": {
        "date": "2025",
        "value": "-0.422766754018983"
      },
      "TR": {
        "date": "2025",
        "value": null
      },
      "ID": {
        "date": "2025",
        "value": "-0.105263812011573"
      },
      "MX": {
        "date": "2025",
        "value": "-0.447421048798837"
      }
    },
    "FM.LBL.BMNY.GD.ZS": {
      "SA": {
        "date": "2025",
        "value": null
      },
      "US": {
        "date": "2025",
        "value": "99.7158460103202"
      },
      "CN": {
        "date": "2025",
        "value": null
      },
      "DE": {
        "date": "2025",
        "value": null
      },
      "IN": {
        "date": "2025",
        "value": null
      },
      "JP": {
        "date": "2025",
        "value": "246.778137129339"
      },
      "GB": {
        "date": "2025",
        "value": null
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": null
      },
      "KR": {
        "date": "2025",
        "value": null
      },
      "BR": {
        "date": "2025",
        "value": "118.229901320866"
      },
      "CA": {
        "date": "2025",
        "value": null
      },
      "AU": {
        "date": "2025",
        "value": "133.123867607559"
      },
      "ZA": {
        "date": "2025",
        "value": "76.8715951477266"
      },
      "TR": {
        "date": "2025",
        "value": "42.405460458804"
      },
      "ID": {
        "date": "2025",
        "value": "42.5448558580342"
      },
      "MX": {
        "date": "2025",
        "value": "48.0031481488499"
      }
    },
    "FR.INR.RINR": {
      "SA": {
        "date": "2025",
        "value": null
      },
      "US": {
        "date": "2025",
        "value": null
      },
      "CN": {
        "date": "2025",
        "value": null
      },
      "DE": {
        "date": "2025",
        "value": null
      },
      "IN": {
        "date": "2025",
        "value": null
      },
      "JP": {
        "date": "2025",
        "value": null
      },
      "GB": {
        "date": "2025",
        "value": null
      },
      "AE": {
        "date": "2025",
        "value": null
      },
      "FR": {
        "date": "2025",
        "value": null
      },
      "KR": {
        "date": "2025",
        "value": "1.03398477457102"
      },
      "BR": {
        "date": "2025",
        "value": "37.4603628210418"
      },
      "CA": {
        "date": "2025",
        "value": null
      },
      "AU": {
        "date": "2025",
        "value": null
      },
      "ZA": {
        "date": "2025",
        "value": "7.6835409853926"
      },
      "TR": {
        "date": "2025",
        "value": null
      },
      "ID": {
        "date": "2025",
        "value": "5.99079693113722"
      },
      "MX": {
        "date": "2025",
        "value": "3.9709808535188"
      }
    },
    "GC.DOD.TOTL.GD.ZS": {
      "SA": {
        "date": "2024",
        "value": null
      },
      "US": {
        "date": "2024",
        "value": "115.768352618316"
      },
      "CN": {
        "date": "2024",
        "value": null
      },
      "DE": {
        "date": "2024",
        "value": null
      },
      "IN": {
        "date": "2024",
        "value": null
      },
      "JP": {
        "date": "2024",
        "value": null
      },
      "GB": {
        "date": "2024",
        "value": "130.735888365813"
      },
      "AE": {
        "date": "2024",
        "value": null
      },
      "FR": {
        "date": "2024",
        "value": null
      },
      "KR": {
        "date": "2024",
        "value": "47.8141426119509"
      },
      "BR": {
        "date": "2024",
        "value": "81.8554431191023"
      },
      "CA": {
        "date": "2024",
        "value": "64.1314232901439"
      },
      "AU": {
        "date": "2024",
        "value": null
      },
      "ZA": {
        "date": "2024",
        "value": "82.7627080034486"
      },
      "TR": {
        "date": "2024",
        "value": "26.6192344930079"
      },
      "ID": {
        "date": "2024",
        "value": null
      },
      "MX": {
        "date": "2024",
        "value": "50.270950655733"
      }
    },
    "GC.REV.XGRT.GD.ZS": {
      "SA": {
        "date": "2024",
        "value": "26.7720165625072"
      },
      "US": {
        "date": "2024",
        "value": "17.7796750243779"
      },
      "CN": {
        "date": "2024",
        "value": "14.9328173497711"
      },
      "DE": {
        "date": "2024",
        "value": "29.3708896111546"
      },
      "IN": {
        "date": "2024",
        "value": null
      },
      "JP": {
        "date": "2024",
        "value": null
      },
      "GB": {
        "date": "2024",
        "value": "34.8309702695262"
      },
      "AE": {
        "date": "2024",
        "value": "3.03252419550258"
      },
      "FR": {
        "date": "2024",
        "value": "42.1079880169865"
      },
      "KR": {
        "date": "2024",
        "value": "25.7690025538074"
      },
      "BR": {
        "date": "2024",
        "value": "26.4469343560674"
      },
      "CA": {
        "date": "2024",
        "value": "19.9311190326297"
      },
      "AU": {
        "date": "2024",
        "value": null
      },
      "ZA": {
        "date": "2024",
        "value": "29.3983175912785"
      },
      "TR": {
        "date": "2024",
        "value": "31.4818867249691"
      },
      "ID": {
        "date": "2024",
        "value": null
      },
      "MX": {
        "date": "2024",
        "value": "19.4336463996755"
      }
    },
    "GC.NLD.TOTL.GD.ZS": {
      "SA": {
        "date": "2024",
        "value": "-2.45851850496765"
      },
      "US": {
        "date": "2024",
        "value": "-7.18895885533261"
      },
      "CN": {
        "date": "2024",
        "value": null
      },
      "DE": {
        "date": "2024",
        "value": "-1.68030732483709"
      },
      "IN": {
        "date": "2024",
        "value": null
      },
      "JP": {
        "date": "2024",
        "value": null
      },
      "GB": {
        "date": "2024",
        "value": "-6.86231516155942"
      },
      "AE": {
        "date": "2024",
        "value": "0.388175773737928"
      },
      "FR": {
        "date": "2024",
        "value": "-5.23749461411331"
      },
      "KR": {
        "date": "2024",
        "value": "-1.78522109808118"
      },
      "BR": {
        "date": "2024",
        "value": "-5.69048407132059"
      },
      "CA": {
        "date": "2024",
        "value": "-1.16896907916261"
      },
      "AU": {
        "date": "2024",
        "value": null
      },
      "ZA": {
        "date": "2024",
        "value": "-4.79809758744051"
      },
      "TR": {
        "date": "2024",
        "value": "-2.95931437041885"
      },
      "ID": {
        "date": "2024",
        "value": null
      },
      "MX": {
        "date": "2024",
        "value": "-5.94862268161135"
      }
    },
    "GC.TAX.TOTL.GD.ZS": {
      "SA": {
        "date": "2024",
        "value": "8.09115587851805"
      },
      "US": {
        "date": "2024",
        "value": "10.7694743667429"
      },
      "CN": {
        "date": "2024",
        "value": "7.01806095279297"
      },
      "DE": {
        "date": "2024",
        "value": "10.890812364142"
      },
      "IN": {
        "date": "2024",
        "value": null
      },
      "JP": {
        "date": "2024",
        "value": null
      },
      "GB": {
        "date": "2024",
        "value": "26.8890215407942"
      },
      "AE": {
        "date": "2024",
        "value": "0.647516088466425"
      },
      "FR": {
        "date": "2024",
        "value": "22.778486344686"
      },
      "KR": {
        "date": "2024",
        "value": "13.2937188380388"
      },
      "BR": {
        "date": "2024",
        "value": "15.4102340832552"
      },
      "CA": {
        "date": "2024",
        "value": "13.7145570395982"
      },
      "AU": {
        "date": "2024",
        "value": null
      },
      "ZA": {
        "date": "2024",
        "value": "25.8775949092475"
      },
      "TR": {
        "date": "2024",
        "value": "17.6239296509985"
      },
      "ID": {
        "date": "2024",
        "value": null
      },
      "MX": {
        "date": "2024",
        "value": "14.8241106773063"
      }
    }
  },
  "history": {
    "NY.GDP.MKTP.KD.ZG": {
      "SA": [
        {
          "year": "2011",
          "value": "11.758820686671"
        },
        {
          "year": "2012",
          "value": "5.76157382270968"
        },
        {
          "year": "2013",
          "value": "2.94563789152025"
        },
        {
          "year": "2014",
          "value": "4.02467158380668"
        },
        {
          "year": "2015",
          "value": "4.65512316652699"
        },
        {
          "year": "2016",
          "value": "1.70404739202878"
        },
        {
          "year": "2017",
          "value": "1.18210705878283"
        },
        {
          "year": "2018",
          "value": "3.2269508901591"
        },
        {
          "year": "2019",
          "value": "1.65158925617395"
        },
        {
          "year": "2020",
          "value": "-3.80478901996312"
        },
        {
          "year": "2021",
          "value": "6.51959698325419"
        },
        {
          "year": "2022",
          "value": "12.0005874752929"
        },
        {
          "year": "2023",
          "value": "0.542592439393161"
        },
        {
          "year": "2024",
          "value": "2.64893068308965"
        },
        {
          "year": "2025",
          "value": "4.50246560191663"
        }
      ],
      "US": [
        {
          "year": "2011",
          "value": "1.56440685205419"
        },
        {
          "year": "2012",
          "value": "2.28911339009767"
        },
        {
          "year": "2013",
          "value": "2.11783009443471"
        },
        {
          "year": "2014",
          "value": "2.52381981757846"
        },
        {
          "year": "2015",
          "value": "2.94555045227337"
        },
        {
          "year": "2016",
          "value": "1.81945147909089"
        },
        {
          "year": "2017",
          "value": "2.45762230126449"
        },
        {
          "year": "2018",
          "value": "2.96650506701943"
        },
        {
          "year": "2019",
          "value": "2.58382533052225"
        },
        {
          "year": "2020",
          "value": "-2.081375977796"
        },
        {
          "year": "2021",
          "value": "6.15202247867526"
        },
        {
          "year": "2022",
          "value": "2.52421385073222"
        },
        {
          "year": "2023",
          "value": "2.93436322440155"
        },
        {
          "year": "2024",
          "value": "2.79318715363841"
        },
        {
          "year": "2025",
          "value": "2.16138195623856"
        }
      ],
      "CN": [
        {
          "year": "2011",
          "value": "9.46205248298186"
        },
        {
          "year": "2012",
          "value": "7.8578201481217"
        },
        {
          "year": "2013",
          "value": "7.77842954757257"
        },
        {
          "year": "2014",
          "value": "7.46100735778161"
        },
        {
          "year": "2015",
          "value": "6.98162255562367"
        },
        {
          "year": "2016",
          "value": "6.7736886867727"
        },
        {
          "year": "2017",
          "value": "6.89123916636191"
        },
        {
          "year": "2018",
          "value": "6.757806142324"
        },
        {
          "year": "2019",
          "value": "6.06737806333672"
        },
        {
          "year": "2020",
          "value": "2.33950385203023"
        },
        {
          "year": "2021",
          "value": "8.57038414981781"
        },
        {
          "year": "2022",
          "value": "3.13385438394069"
        },
        {
          "year": "2023",
          "value": "5.41600334492955"
        },
        {
          "year": "2024",
          "value": "4.95830378788091"
        },
        {
          "year": "2025",
          "value": "4.95994886240992"
        }
      ],
      "DE": [
        {
          "year": "2011",
          "value": "3.75796884489337"
        },
        {
          "year": "2012",
          "value": "0.463512036709204"
        },
        {
          "year": "2013",
          "value": "0.396995583779145"
        },
        {
          "year": "2014",
          "value": "2.18018602168017"
        },
        {
          "year": "2015",
          "value": "1.66300602334775"
        },
        {
          "year": "2016",
          "value": "2.22222216259371"
        },
        {
          "year": "2017",
          "value": "2.797906720551"
        },
        {
          "year": "2018",
          "value": "1.13569604599849"
        },
        {
          "year": "2019",
          "value": "0.977734697038784"
        },
        {
          "year": "2020",
          "value": "-4.13191443239947"
        },
        {
          "year": "2021",
          "value": "3.90999994204108"
        },
        {
          "year": "2022",
          "value": "1.8092581243061"
        },
        {
          "year": "2023",
          "value": "-0.869647578573321"
        },
        {
          "year": "2024",
          "value": "-0.495851897260366"
        },
        {
          "year": "2025",
          "value": "0.239578342117881"
        }
      ],
      "IN": [
        {
          "year": "2011",
          "value": "5.24131620024293"
        },
        {
          "year": "2012",
          "value": "5.45638755164772"
        },
        {
          "year": "2013",
          "value": "6.38610640091713"
        },
        {
          "year": "2014",
          "value": "7.41022760516977"
        },
        {
          "year": "2015",
          "value": "7.99625378567987"
        },
        {
          "year": "2016",
          "value": "8.25630550176662"
        },
        {
          "year": "2017",
          "value": "6.79538341902422"
        },
        {
          "year": "2018",
          "value": "6.45385134495295"
        },
        {
          "year": "2019",
          "value": "3.87143694070524"
        },
        {
          "year": "2020",
          "value": "-5.77772470687303"
        },
        {
          "year": "2021",
          "value": "9.68959249191741"
        },
        {
          "year": "2022",
          "value": "7.6093649776932"
        },
        {
          "year": "2023",
          "value": "7.210224629335"
        },
        {
          "year": "2024",
          "value": "7.09927893176518"
        },
        {
          "year": "2025",
          "value": "7.56666179284244"
        }
      ],
      "JP": [
        {
          "year": "2011",
          "value": "-0.20035785332982"
        },
        {
          "year": "2012",
          "value": "1.64893452981225"
        },
        {
          "year": "2013",
          "value": "1.99727653399265"
        },
        {
          "year": "2014",
          "value": "0.905915486065865"
        },
        {
          "year": "2015",
          "value": "1.79997735783475"
        },
        {
          "year": "2016",
          "value": "0.704986495111257"
        },
        {
          "year": "2017",
          "value": "1.62345062245441"
        },
        {
          "year": "2018",
          "value": "0.834143845965585"
        },
        {
          "year": "2019",
          "value": "-0.308496921143259"
        },
        {
          "year": "2020",
          "value": "-4.28327942675573"
        },
        {
          "year": "2021",
          "value": "3.56419531474475"
        },
        {
          "year": "2022",
          "value": "1.33164750653741"
        },
        {
          "year": "2023",
          "value": "0.720785304749811"
        },
        {
          "year": "2024",
          "value": "-0.240084236041696"
        },
        {
          "year": "2025",
          "value": "1.19311288444599"
        }
      ],
      "GB": [
        {
          "year": "2011",
          "value": "0.851437739020326"
        },
        {
          "year": "2012",
          "value": "1.52826034721852"
        },
        {
          "year": "2013",
          "value": "1.71846961308464"
        },
        {
          "year": "2014",
          "value": "3.16017351468152"
        },
        {
          "year": "2015",
          "value": "2.14040560033371"
        },
        {
          "year": "2016",
          "value": "2.20652020635357"
        },
        {
          "year": "2017",
          "value": "3.02322219840339"
        },
        {
          "year": "2018",
          "value": "1.55133095078786"
        },
        {
          "year": "2019",
          "value": "1.25629899760824"
        },
        {
          "year": "2020",
          "value": "-10.047896637362"
        },
        {
          "year": "2021",
          "value": "8.5431118453255"
        },
        {
          "year": "2022",
          "value": "5.14970388522993"
        },
        {
          "year": "2023",
          "value": "0.271650048355255"
        },
        {
          "year": "2024",
          "value": "1.08027716858781"
        },
        {
          "year": "2025",
          "value": "1.38844207858726"
        }
      ],
      "AE": [
        {
          "year": "2010",
          "value": "1.60285004336325"
        },
        {
          "year": "2011",
          "value": "6.73651167897515"
        },
        {
          "year": "2012",
          "value": "4.68325642918792"
        },
        {
          "year": "2013",
          "value": "4.9184505919085"
        },
        {
          "year": "2014",
          "value": "4.63291785879667"
        },
        {
          "year": "2015",
          "value": "7.08766622657654"
        },
        {
          "year": "2016",
          "value": "5.65790147196586"
        },
        {
          "year": "2017",
          "value": "-1.06137114472548"
        },
        {
          "year": "2018",
          "value": "1.53720634021511"
        },
        {
          "year": "2019",
          "value": "1.27129120536284"
        },
        {
          "year": "2020",
          "value": "-8.69343363776639"
        },
        {
          "year": "2021",
          "value": "4.55280140106356"
        },
        {
          "year": "2022",
          "value": "7.51452414254605"
        },
        {
          "year": "2023",
          "value": "4.30113648499413"
        },
        {
          "year": "2024",
          "value": "3.99181200361831"
        }
      ],
      "FR": [
        {
          "year": "2011",
          "value": "2.43757653729007"
        },
        {
          "year": "2012",
          "value": "0.183835264973013"
        },
        {
          "year": "2013",
          "value": "0.781756446231"
        },
        {
          "year": "2014",
          "value": "0.997832947295251"
        },
        {
          "year": "2015",
          "value": "1.06675474783462"
        },
        {
          "year": "2016",
          "value": "0.860031075424033"
        },
        {
          "year": "2017",
          "value": "2.08361485997399"
        },
        {
          "year": "2018",
          "value": "1.64590872395887"
        },
        {
          "year": "2019",
          "value": "2.02744646419237"
        },
        {
          "year": "2020",
          "value": "-7.44064589948231"
        },
        {
          "year": "2021",
          "value": "6.88233783360239"
        },
        {
          "year": "2022",
          "value": "2.71676264185913"
        },
        {
          "year": "2023",
          "value": "1.43921494437743"
        },
        {
          "year": "2024",
          "value": "1.19046798275883"
        },
        {
          "year": "2025",
          "value": "0.840949955479587"
        }
      ],
      "KR": [
        {
          "year": "2011",
          "value": "3.6880320602952"
        },
        {
          "year": "2012",
          "value": "2.54766550568242"
        },
        {
          "year": "2013",
          "value": "3.2913959543442"
        },
        {
          "year": "2014",
          "value": "3.21468019683108"
        },
        {
          "year": "2015",
          "value": "2.92029267301234"
        },
        {
          "year": "2016",
          "value": "3.17152748983935"
        },
        {
          "year": "2017",
          "value": "3.433191763972"
        },
        {
          "year": "2018",
          "value": "3.17611568177327"
        },
        {
          "year": "2019",
          "value": "2.31380210595475"
        },
        {
          "year": "2020",
          "value": "-0.700242317542106"
        },
        {
          "year": "2021",
          "value": "4.61296795454287"
        },
        {
          "year": "2022",
          "value": "2.72756456708991"
        },
        {
          "year": "2023",
          "value": "1.58301467403629"
        },
        {
          "year": "2024",
          "value": "2.00361101838986"
        },
        {
          "year": "2025",
          "value": "1.00701840291242"
        }
      ],
      "BR": [
        {
          "year": "2011",
          "value": "3.97442307944702"
        },
        {
          "year": "2012",
          "value": "1.92117598576537"
        },
        {
          "year": "2013",
          "value": "3.00482266944432"
        },
        {
          "year": "2014",
          "value": "0.503955740242247"
        },
        {
          "year": "2015",
          "value": "-3.54576339269425"
        },
        {
          "year": "2016",
          "value": "-3.27591690782192"
        },
        {
          "year": "2017",
          "value": "1.32286905404399"
        },
        {
          "year": "2018",
          "value": "1.783666761634"
        },
        {
          "year": "2019",
          "value": "1.22077782360842"
        },
        {
          "year": "2020",
          "value": "-3.2767587964736"
        },
        {
          "year": "2021",
          "value": "4.76260437908608"
        },
        {
          "year": "2022",
          "value": "3.01669435393015"
        },
        {
          "year": "2023",
          "value": "3.24165532906981"
        },
        {
          "year": "2024",
          "value": "3.41931516501906"
        },
        {
          "year": "2025",
          "value": "2.2857464902475"
        }
      ],
      "CA": [
        {
          "year": "2011",
          "value": "3.1371944343876"
        },
        {
          "year": "2012",
          "value": "1.75566133205234"
        },
        {
          "year": "2013",
          "value": "2.32581356612762"
        },
        {
          "year": "2014",
          "value": "2.87346675579731"
        },
        {
          "year": "2015",
          "value": "0.64997101491096"
        },
        {
          "year": "2016",
          "value": "1.03855091989323"
        },
        {
          "year": "2017",
          "value": "3.03383491841392"
        },
        {
          "year": "2018",
          "value": "2.74296341402246"
        },
        {
          "year": "2019",
          "value": "1.90843193887251"
        },
        {
          "year": "2020",
          "value": "-5.03823342794087"
        },
        {
          "year": "2021",
          "value": "5.95052804984759"
        },
        {
          "year": "2022",
          "value": "4.69541985045903"
        },
        {
          "year": "2023",
          "value": "1.95308552199025"
        },
        {
          "year": "2024",
          "value": "2.04626605401701"
        },
        {
          "year": "2025",
          "value": "1.74268536175708"
        }
      ],
      "AU": [
        {
          "year": "2011",
          "value": "2.39473494330615"
        },
        {
          "year": "2012",
          "value": "3.95247138119184"
        },
        {
          "year": "2013",
          "value": "2.65445302592404"
        },
        {
          "year": "2014",
          "value": "2.60118978187332"
        },
        {
          "year": "2015",
          "value": "2.16434780647852"
        },
        {
          "year": "2016",
          "value": "2.75564065529868"
        },
        {
          "year": "2017",
          "value": "2.29331030192918"
        },
        {
          "year": "2018",
          "value": "2.87417039499501"
        },
        {
          "year": "2019",
          "value": "2.19401703622717"
        },
        {
          "year": "2020",
          "value": "-0.133531904304775"
        },
        {
          "year": "2021",
          "value": "2.00694844335034"
        },
        {
          "year": "2022",
          "value": "4.25304559238732"
        },
        {
          "year": "2023",
          "value": "3.58382100798981"
        },
        {
          "year": "2024",
          "value": "1.37340773365975"
        },
        {
          "year": "2025",
          "value": "1.35039785076631"
        }
      ],
      "ZA": [
        {
          "year": "2011",
          "value": "3.16855627858818"
        },
        {
          "year": "2012",
          "value": "2.39623238465745"
        },
        {
          "year": "2013",
          "value": "2.48546800826588"
        },
        {
          "year": "2014",
          "value": "1.41382645223793"
        },
        {
          "year": "2015",
          "value": "1.32186223678229"
        },
        {
          "year": "2016",
          "value": "0.664552307858116"
        },
        {
          "year": "2017",
          "value": "1.15794695181735"
        },
        {
          "year": "2018",
          "value": "1.55678384721676"
        },
        {
          "year": "2019",
          "value": "0.25993557687633"
        },
        {
          "year": "2020",
          "value": "-6.1689177146757"
        },
        {
          "year": "2021",
          "value": "4.85864865060148"
        },
        {
          "year": "2022",
          "value": "2.05813661692193"
        },
        {
          "year": "2023",
          "value": "0.80610455095804"
        },
        {
          "year": "2024",
          "value": "0.534843531905139"
        },
        {
          "year": "2025",
          "value": "1.11462608103956"
        }
      ],
      "TR": [
        {
          "year": "2011",
          "value": "10.9799625273598"
        },
        {
          "year": "2012",
          "value": "4.80762696633448"
        },
        {
          "year": "2013",
          "value": "8.48825689298511"
        },
        {
          "year": "2014",
          "value": "4.60079447270559"
        },
        {
          "year": "2015",
          "value": "5.80557386628684"
        },
        {
          "year": "2016",
          "value": "3.32366508200445"
        },
        {
          "year": "2017",
          "value": "7.82585730002594"
        },
        {
          "year": "2018",
          "value": "3.46815306092219"
        },
        {
          "year": "2019",
          "value": "1.30162365464503"
        },
        {
          "year": "2020",
          "value": "1.80306247087255"
        },
        {
          "year": "2021",
          "value": "11.811094450607"
        },
        {
          "year": "2022",
          "value": "5.44122511322401"
        },
        {
          "year": "2023",
          "value": "5.04512369812289"
        },
        {
          "year": "2024",
          "value": "3.3276230893799"
        },
        {
          "year": "2025",
          "value": "3.60462514082589"
        }
      ],
      "ID": [
        {
          "year": "2011",
          "value": "6.16978420771008"
        },
        {
          "year": "2012",
          "value": "6.03005065305615"
        },
        {
          "year": "2013",
          "value": "5.5572636889101"
        },
        {
          "year": "2014",
          "value": "5.006668425755"
        },
        {
          "year": "2015",
          "value": "4.87632230022123"
        },
        {
          "year": "2016",
          "value": "5.03306918280177"
        },
        {
          "year": "2017",
          "value": "5.06978590134916"
        },
        {
          "year": "2018",
          "value": "5.17429153955024"
        },
        {
          "year": "2019",
          "value": "5.01928768046282"
        },
        {
          "year": "2020",
          "value": "-2.06551182934165"
        },
        {
          "year": "2021",
          "value": "3.70288562827751"
        },
        {
          "year": "2022",
          "value": "5.30719722664799"
        },
        {
          "year": "2023",
          "value": "5.04883117855516"
        },
        {
          "year": "2024",
          "value": "5.03257477088519"
        },
        {
          "year": "2025",
          "value": "5.10808904438025"
        }
      ],
      "MX": [
        {
          "year": "2011",
          "value": "3.44404505297089"
        },
        {
          "year": "2012",
          "value": "3.55321076010608"
        },
        {
          "year": "2013",
          "value": "0.852101550164704"
        },
        {
          "year": "2014",
          "value": "2.50376350783593"
        },
        {
          "year": "2015",
          "value": "2.70232343024026"
        },
        {
          "year": "2016",
          "value": "1.7724932254128"
        },
        {
          "year": "2017",
          "value": "1.87172854648381"
        },
        {
          "year": "2018",
          "value": "1.97208211101069"
        },
        {
          "year": "2019",
          "value": "-0.392690513290532"
        },
        {
          "year": "2020",
          "value": "-8.35403459379062"
        },
        {
          "year": "2021",
          "value": "6.04848347173572"
        },
        {
          "year": "2022",
          "value": "3.70975708309098"
        },
        {
          "year": "2023",
          "value": "3.1067964131456"
        },
        {
          "year": "2024",
          "value": "1.35057631384696"
        },
        {
          "year": "2025",
          "value": "0.561683456144578"
        }
      ]
    },
    "FP.CPI.TOTL.ZG": {
      "SA": [
        {
          "year": "2011",
          "value": "5.8262163739404"
        },
        {
          "year": "2012",
          "value": "2.86627029905053"
        },
        {
          "year": "2013",
          "value": "3.51104209799866"
        },
        {
          "year": "2014",
          "value": "2.24185348779063"
        },
        {
          "year": "2015",
          "value": "1.22269318552328"
        },
        {
          "year": "2016",
          "value": "2.05347076823965"
        },
        {
          "year": "2017",
          "value": "-0.834845735027162"
        },
        {
          "year": "2018",
          "value": "2.46594308994843"
        },
        {
          "year": "2019",
          "value": "-1.19298644533328"
        },
        {
          "year": "2020",
          "value": "3.37234961012303"
        },
        {
          "year": "2021",
          "value": "3.06328988941548"
        },
        {
          "year": "2022",
          "value": "2.47407371925372"
        },
        {
          "year": "2023",
          "value": "2.32708518362706"
        },
        {
          "year": "2024",
          "value": "1.68792112375809"
        },
        {
          "year": "2025",
          "value": "2.08420853585036"
        }
      ],
      "US": [
        {
          "year": "2010",
          "value": "1.6400434423899"
        },
        {
          "year": "2011",
          "value": "3.156841568622"
        },
        {
          "year": "2012",
          "value": "2.06933726526067"
        },
        {
          "year": "2013",
          "value": "1.46483265562717"
        },
        {
          "year": "2014",
          "value": "1.62222297740817"
        },
        {
          "year": "2015",
          "value": "0.118627135552451"
        },
        {
          "year": "2016",
          "value": "1.26158320570536"
        },
        {
          "year": "2017",
          "value": "2.13011000365961"
        },
        {
          "year": "2018",
          "value": "2.44258329692817"
        },
        {
          "year": "2019",
          "value": "1.81221007526021"
        },
        {
          "year": "2020",
          "value": "1.23358439630629"
        },
        {
          "year": "2021",
          "value": "4.69785886363742"
        },
        {
          "year": "2022",
          "value": "8.00279982052121"
        },
        {
          "year": "2023",
          "value": "4.11633838374488"
        },
        {
          "year": "2024",
          "value": "2.94952520485207"
        }
      ],
      "CN": [
        {
          "year": "2011",
          "value": "5.55389892257493"
        },
        {
          "year": "2012",
          "value": "2.61952432645541"
        },
        {
          "year": "2013",
          "value": "2.62105001748115"
        },
        {
          "year": "2014",
          "value": "1.92164162788521"
        },
        {
          "year": "2015",
          "value": "1.43702380935655"
        },
        {
          "year": "2016",
          "value": "2.00000182191943"
        },
        {
          "year": "2017",
          "value": "1.59313600071436"
        },
        {
          "year": "2018",
          "value": "2.07479039965576"
        },
        {
          "year": "2019",
          "value": "2.89923416358227"
        },
        {
          "year": "2020",
          "value": "2.41942189457782"
        },
        {
          "year": "2021",
          "value": "0.981015135544882"
        },
        {
          "year": "2022",
          "value": "1.97357555739051"
        },
        {
          "year": "2023",
          "value": "0.234836828893051"
        },
        {
          "year": "2024",
          "value": "0.218128938439177"
        },
        {
          "year": "2025",
          "value": "0.0595646916565403"
        }
      ],
      "DE": [
        {
          "year": "2011",
          "value": "2.07517283735874"
        },
        {
          "year": "2012",
          "value": "2.00848884782956"
        },
        {
          "year": "2013",
          "value": "1.50472330251876"
        },
        {
          "year": "2014",
          "value": "0.906794000434246"
        },
        {
          "year": "2015",
          "value": "0.514426137125456"
        },
        {
          "year": "2016",
          "value": "0.491747008445174"
        },
        {
          "year": "2017",
          "value": "1.50949485109628"
        },
        {
          "year": "2018",
          "value": "1.73216879766942"
        },
        {
          "year": "2019",
          "value": "1.44565976888253"
        },
        {
          "year": "2020",
          "value": "0.144877925813982"
        },
        {
          "year": "2021",
          "value": "3.06666666666673"
        },
        {
          "year": "2022",
          "value": "6.87257438551097"
        },
        {
          "year": "2023",
          "value": "5.94643667725823"
        },
        {
          "year": "2024",
          "value": "2.2564981433876"
        },
        {
          "year": "2025",
          "value": "2.17178770949721"
        }
      ],
      "IN": [
        {
          "year": "2011",
          "value": "8.9117933648336"
        },
        {
          "year": "2012",
          "value": "9.47899691419793"
        },
        {
          "year": "2013",
          "value": "10.0178784746104"
        },
        {
          "year": "2014",
          "value": "6.66565671867899"
        },
        {
          "year": "2015",
          "value": "4.90697344127249"
        },
        {
          "year": "2016",
          "value": "4.94821634062134"
        },
        {
          "year": "2017",
          "value": "3.32817337461305"
        },
        {
          "year": "2018",
          "value": "3.93882646691643"
        },
        {
          "year": "2019",
          "value": "3.72950573539123"
        },
        {
          "year": "2020",
          "value": "6.6234367762853"
        },
        {
          "year": "2021",
          "value": "5.13140747176364"
        },
        {
          "year": "2022",
          "value": "6.69903414079858"
        },
        {
          "year": "2023",
          "value": "5.64914318907925"
        },
        {
          "year": "2024",
          "value": "4.95303550973661"
        },
        {
          "year": "2025",
          "value": "2.39884954182294"
        }
      ],
      "JP": [
        {
          "year": "2011",
          "value": "-0.27245561610124"
        },
        {
          "year": "2012",
          "value": "-0.0440645104432602"
        },
        {
          "year": "2013",
          "value": "0.335037912184741"
        },
        {
          "year": "2014",
          "value": "2.75922671353253"
        },
        {
          "year": "2015",
          "value": "0.795279630579839"
        },
        {
          "year": "2016",
          "value": "-0.127258844489754"
        },
        {
          "year": "2017",
          "value": "0.484199796126385"
        },
        {
          "year": "2018",
          "value": "0.989094598021848"
        },
        {
          "year": "2019",
          "value": "0.46877615938395"
        },
        {
          "year": "2020",
          "value": "-0.024995834027731"
        },
        {
          "year": "2021",
          "value": "-0.233352779398264"
        },
        {
          "year": "2022",
          "value": "2.49770278172255"
        },
        {
          "year": "2023",
          "value": "3.26813365933163"
        },
        {
          "year": "2024",
          "value": "2.73853681635241"
        },
        {
          "year": "2025",
          "value": "3.17253034260248"
        }
      ],
      "GB": [
        {
          "year": "2011",
          "value": "3.8561124468282"
        },
        {
          "year": "2012",
          "value": "2.5732347965453"
        },
        {
          "year": "2013",
          "value": "2.29166666666659"
        },
        {
          "year": "2014",
          "value": "1.45112016293279"
        },
        {
          "year": "2015",
          "value": "0.36804684232536"
        },
        {
          "year": "2016",
          "value": "1.0084173681141"
        },
        {
          "year": "2017",
          "value": "2.55775577557747"
        },
        {
          "year": "2018",
          "value": "2.29283990345938"
        },
        {
          "year": "2019",
          "value": "1.73810460086513"
        },
        {
          "year": "2020",
          "value": "0.989486703772491"
        },
        {
          "year": "2021",
          "value": "2.51837109614213"
        },
        {
          "year": "2022",
          "value": "7.92204883147902"
        },
        {
          "year": "2023",
          "value": "6.79396706793963"
        },
        {
          "year": "2024",
          "value": "3.2715729463592"
        },
        {
          "year": "2025",
          "value": "3.88306881626"
        }
      ],
      "AE": [
        {
          "year": "2011",
          "value": "0.87734659568512"
        },
        {
          "year": "2012",
          "value": "0.662268900269009"
        },
        {
          "year": "2013",
          "value": "1.1011183637571"
        },
        {
          "year": "2014",
          "value": "2.34626865671643"
        },
        {
          "year": "2015",
          "value": "4.06996608361593"
        },
        {
          "year": "2016",
          "value": "1.61748808904198"
        },
        {
          "year": "2017",
          "value": "1.96682557818842"
        },
        {
          "year": "2018",
          "value": "3.06863379251997"
        },
        {
          "year": "2019",
          "value": "-1.93108114782173"
        },
        {
          "year": "2020",
          "value": "-2.07940317940944"
        },
        {
          "year": "2021",
          "value": "0.179935336174431"
        },
        {
          "year": "2022",
          "value": "5.29122604376849"
        },
        {
          "year": "2023",
          "value": "1.62670837213248"
        },
        {
          "year": "2024",
          "value": "1.66336510224894"
        },
        {
          "year": "2025",
          "value": "1.250865245598"
        }
      ],
      "FR": [
        {
          "year": "2011",
          "value": "2.11159795175"
        },
        {
          "year": "2012",
          "value": "1.9541953161351"
        },
        {
          "year": "2013",
          "value": "0.863715497861804"
        },
        {
          "year": "2014",
          "value": "0.50775882293799"
        },
        {
          "year": "2015",
          "value": "0.0375143805125182"
        },
        {
          "year": "2016",
          "value": "0.183334861123765"
        },
        {
          "year": "2017",
          "value": "1.03228275064681"
        },
        {
          "year": "2018",
          "value": "1.85081508315493"
        },
        {
          "year": "2019",
          "value": "1.10825492288294"
        },
        {
          "year": "2020",
          "value": "0.476498852725065"
        },
        {
          "year": "2021",
          "value": "1.64233141038394"
        },
        {
          "year": "2022",
          "value": "5.22236748369725"
        },
        {
          "year": "2023",
          "value": "4.8783572650844"
        },
        {
          "year": "2024",
          "value": "1.99904942291463"
        },
        {
          "year": "2025",
          "value": "0.943770212469976"
        }
      ],
      "KR": [
        {
          "year": "2011",
          "value": "4.0259650043609"
        },
        {
          "year": "2012",
          "value": "2.18707104433314"
        },
        {
          "year": "2013",
          "value": "1.30134754547413"
        },
        {
          "year": "2014",
          "value": "1.27477446401322"
        },
        {
          "year": "2015",
          "value": "0.70633177245575"
        },
        {
          "year": "2016",
          "value": "0.971685739912168"
        },
        {
          "year": "2017",
          "value": "1.94433230786366"
        },
        {
          "year": "2018",
          "value": "1.47583935002645"
        },
        {
          "year": "2019",
          "value": "0.383000303608136"
        },
        {
          "year": "2020",
          "value": "0.537288023411737"
        },
        {
          "year": "2021",
          "value": "2.49833333333339"
        },
        {
          "year": "2022",
          "value": "5.08951365062842"
        },
        {
          "year": "2023",
          "value": "3.5974562502901"
        },
        {
          "year": "2024",
          "value": "2.32174328643542"
        },
        {
          "year": "2025",
          "value": "2.12309421458659"
        }
      ],
      "BR": [
        {
          "year": "2011",
          "value": "6.6364496221309"
        },
        {
          "year": "2012",
          "value": "5.40349914036997"
        },
        {
          "year": "2013",
          "value": "6.20431066640101"
        },
        {
          "year": "2014",
          "value": "6.32904015516139"
        },
        {
          "year": "2015",
          "value": "9.02990102416136"
        },
        {
          "year": "2016",
          "value": "8.73914352329393"
        },
        {
          "year": "2017",
          "value": "3.44637335032669"
        },
        {
          "year": "2018",
          "value": "3.66485028376729"
        },
        {
          "year": "2019",
          "value": "3.73297621216894"
        },
        {
          "year": "2020",
          "value": "3.21176803803376"
        },
        {
          "year": "2021",
          "value": "8.30165975585673"
        },
        {
          "year": "2022",
          "value": "9.28010608956873"
        },
        {
          "year": "2023",
          "value": "4.59356282283204"
        },
        {
          "year": "2024",
          "value": "4.36746407652337"
        },
        {
          "year": "2025",
          "value": "5.01675279604836"
        }
      ],
      "CA": [
        {
          "year": "2011",
          "value": "2.91213508872351"
        },
        {
          "year": "2012",
          "value": "1.51567823124517"
        },
        {
          "year": "2013",
          "value": "0.938291897815317"
        },
        {
          "year": "2014",
          "value": "1.90663590717861"
        },
        {
          "year": "2015",
          "value": "1.12524136094277"
        },
        {
          "year": "2016",
          "value": "1.42875954701085"
        },
        {
          "year": "2017",
          "value": "1.59688412852977"
        },
        {
          "year": "2018",
          "value": "2.26822567248103"
        },
        {
          "year": "2019",
          "value": "1.94926902411593"
        },
        {
          "year": "2020",
          "value": "0.716999632307827"
        },
        {
          "year": "2021",
          "value": "3.39519318527528"
        },
        {
          "year": "2022",
          "value": "6.80280115341613"
        },
        {
          "year": "2023",
          "value": "3.87900159788426"
        },
        {
          "year": "2024",
          "value": "2.38158383281173"
        },
        {
          "year": "2025",
          "value": "2.07232411149103"
        }
      ],
      "AU": [
        {
          "year": "2011",
          "value": "3.30384784681081"
        },
        {
          "year": "2012",
          "value": "1.76278299052228"
        },
        {
          "year": "2013",
          "value": "2.44988248109259"
        },
        {
          "year": "2014",
          "value": "2.48792932080492"
        },
        {
          "year": "2015",
          "value": "1.50836803138463"
        },
        {
          "year": "2016",
          "value": "1.27699365720306"
        },
        {
          "year": "2017",
          "value": "1.94864309065653"
        },
        {
          "year": "2018",
          "value": "1.91140002818579"
        },
        {
          "year": "2019",
          "value": "1.610770929127"
        },
        {
          "year": "2020",
          "value": "0.846900734607273"
        },
        {
          "year": "2021",
          "value": "2.86391284709318"
        },
        {
          "year": "2022",
          "value": "6.59409658717841"
        },
        {
          "year": "2023",
          "value": "5.59701792296707"
        },
        {
          "year": "2024",
          "value": "3.16656665428797"
        },
        {
          "year": "2025",
          "value": "2.87403791660173"
        }
      ],
      "ZA": [
        {
          "year": "2011",
          "value": "5.0008533879502"
        },
        {
          "year": "2012",
          "value": "5.73797139141739"
        },
        {
          "year": "2013",
          "value": "5.78016910069176"
        },
        {
          "year": "2014",
          "value": "6.13282953059149"
        },
        {
          "year": "2015",
          "value": "4.51869094892506"
        },
        {
          "year": "2016",
          "value": "6.60290842394872"
        },
        {
          "year": "2017",
          "value": "5.18618655524149"
        },
        {
          "year": "2018",
          "value": "4.50987264867388"
        },
        {
          "year": "2019",
          "value": "4.10285075461156"
        },
        {
          "year": "2020",
          "value": "3.23238831615113"
        },
        {
          "year": "2021",
          "value": "4.61874544887136"
        },
        {
          "year": "2022",
          "value": "7.03987272546482"
        },
        {
          "year": "2023",
          "value": "6.0752438457966"
        },
        {
          "year": "2024",
          "value": "4.36115246518962"
        },
        {
          "year": "2025",
          "value": "3.20550474112603"
        }
      ],
      "TR": [
        {
          "year": "2011",
          "value": "6.471879671151"
        },
        {
          "year": "2012",
          "value": "8.89156996512163"
        },
        {
          "year": "2013",
          "value": "7.49309030547693"
        },
        {
          "year": "2014",
          "value": "8.85457271364316"
        },
        {
          "year": "2015",
          "value": "7.67085364845885"
        },
        {
          "year": "2016",
          "value": "7.7751341532833"
        },
        {
          "year": "2017",
          "value": "11.1443110840764"
        },
        {
          "year": "2018",
          "value": "16.3324638988929"
        },
        {
          "year": "2019",
          "value": "15.1768215720022"
        },
        {
          "year": "2020",
          "value": "12.2789574462574"
        },
        {
          "year": "2021",
          "value": "19.5964926913324"
        },
        {
          "year": "2022",
          "value": "72.3088359891207"
        },
        {
          "year": "2023",
          "value": "53.8594087593315"
        },
        {
          "year": "2024",
          "value": "58.5064507300342"
        },
        {
          "year": "2025",
          "value": "34.8811629820306"
        }
      ],
      "ID": [
        {
          "year": "2011",
          "value": "5.35604849112582"
        },
        {
          "year": "2012",
          "value": "4.2795142691943"
        },
        {
          "year": "2013",
          "value": "6.41249457900391"
        },
        {
          "year": "2014",
          "value": "6.39492882396559"
        },
        {
          "year": "2015",
          "value": "6.36312061196646"
        },
        {
          "year": "2016",
          "value": "3.52580452815451"
        },
        {
          "year": "2017",
          "value": "3.80879857691949"
        },
        {
          "year": "2018",
          "value": "3.19834755924996"
        },
        {
          "year": "2019",
          "value": "3.03058460941661"
        },
        {
          "year": "2020",
          "value": "1.91983527270793"
        },
        {
          "year": "2021",
          "value": "1.56007882983334"
        },
        {
          "year": "2022",
          "value": "4.20946463714784"
        },
        {
          "year": "2023",
          "value": "3.66938654859761"
        },
        {
          "year": "2024",
          "value": "2.18151273615189"
        },
        {
          "year": "2025",
          "value": "1.9133344329508"
        }
      ],
      "MX": [
        {
          "year": "2011",
          "value": "3.40737824605742"
        },
        {
          "year": "2012",
          "value": "4.11150981070289"
        },
        {
          "year": "2013",
          "value": "3.80639069747204"
        },
        {
          "year": "2014",
          "value": "4.01861608078679"
        },
        {
          "year": "2015",
          "value": "2.72064064964023"
        },
        {
          "year": "2016",
          "value": "2.8217078474766"
        },
        {
          "year": "2017",
          "value": "6.04145724018986"
        },
        {
          "year": "2018",
          "value": "4.89935015356551"
        },
        {
          "year": "2019",
          "value": "3.63596142127046"
        },
        {
          "year": "2020",
          "value": "3.39683415570006"
        },
        {
          "year": "2021",
          "value": "5.68920847683753"
        },
        {
          "year": "2022",
          "value": "7.8962761916855"
        },
        {
          "year": "2023",
          "value": "5.52796087314389"
        },
        {
          "year": "2024",
          "value": "4.72225588452932"
        },
        {
          "year": "2025",
          "value": "3.80668650726485"
        }
      ]
    }
  },
  "fx": {
    "source": "Frankfurter API, European Central Bank reference rates",
    "url": "https://api.frankfurter.app/latest?from=USD",
    "base": "USD",
    "amount": "1.0",
    "date": "2026-10-02",
    "sarIncluded": false,
    "majors": [
      "EUR",
      "JPY",
      "GBP",
      "CHF",
      "AUD",
      "CAD",
      "NZD"
    ],
    "rates": {
      "AUD": {
        "value": "1.4411",
        "name": "Australian Dollar",
        "group": "major"
      },
      "BRL": {
        "value": "5.2214",
        "name": "Brazilian Real",
        "group": "other"
      },
      "CAD": {
        "value": "1.424",
        "name": "Canadian Dollar",
        "group": "major"
      },
      "CHF": {
        "value": "0.82664",
        "name": "Swiss Franc",
        "group": "major"
      },
      "CNY": {
        "value": "6.7046",
        "name": "Chinese Renminbi Yuan",
        "group": "other"
      },
      "CZK": {
        "value": "21.8",
        "name": "Czech Koruna",
        "group": "other"
      },
      "DKK": {
        "value": "6.658",
        "name": "Danish Krone",
        "group": "other"
      },
      "EUR": {
        "value": "0.89087",
        "name": "Euro",
        "group": "major"
      },
      "GBP": {
        "value": "0.75753",
        "name": "British Pound",
        "group": "major"
      },
      "HKD": {
        "value": "7.8471",
        "name": "Hong Kong Dollar",
        "group": "other"
      },
      "HUF": {
        "value": "328.89",
        "name": "Hungarian Forint",
        "group": "other"
      },
      "IDR": {
        "value": "17950",
        "name": "Indonesian Rupiah",
        "group": "other"
      },
      "ILS": {
        "value": "3.0653",
        "name": "Israeli New Shekel",
        "group": "other"
      },
      "INR": {
        "value": "96.32",
        "name": "Indian Rupee",
        "group": "other"
      },
      "ISK": {
        "value": "122.05",
        "name": "Icelandic Króna",
        "group": "other"
      },
      "JPY": {
        "value": "157.67",
        "name": "Japanese Yen",
        "group": "major"
      },
      "KRW": {
        "value": "1348.28",
        "name": "South Korean Won",
        "group": "other"
      },
      "MXN": {
        "value": "18.335",
        "name": "Mexican Peso",
        "group": "other"
      },
      "MYR": {
        "value": "4.0845",
        "name": "Malaysian Ringgit",
        "group": "other"
      },
      "NOK": {
        "value": "9.6494",
        "name": "Norwegian Krone",
        "group": "other"
      },
      "NZD": {
        "value": "1.7819",
        "name": "New Zealand Dollar",
        "group": "major"
      },
      "PHP": {
        "value": "62.597",
        "name": "Philippine Peso",
        "group": "other"
      },
      "PLN": {
        "value": "3.8998",
        "name": "Polish Złoty",
        "group": "other"
      },
      "RON": {
        "value": "4.7651",
        "name": "Romanian Leu",
        "group": "other"
      },
      "SEK": {
        "value": "10.0579",
        "name": "Swedish Krona",
        "group": "other"
      },
      "SGD": {
        "value": "1.2798",
        "name": "Singapore Dollar",
        "group": "other"
      },
      "THB": {
        "value": "33.595",
        "name": "Thai Baht",
        "group": "other"
      },
      "TRY": {
        "value": "49.145",
        "name": "Turkish Lira",
        "group": "other"
      },
      "ZAR": {
        "value": "16.734",
        "name": "South African Rand",
        "group": "other"
      }
    }
  },
  "calendar": {
    "source": "Forex Factory public weekly calendar",
    "url": "https://nfs.faireconomy.media/ff_calendar_thisweek.json",
    "hasActual": false,
    "sourceWeek": [
      "2026-09-27",
      "2026-10-03"
    ],
    "events": [
      {
        "title": "Monetary Policy Meeting Minutes",
        "currency": "JPY",
        "date": "2026-09-27T19:50:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "SPPI y/y",
        "currency": "JPY",
        "date": "2026-09-27T19:50:00-04:00",
        "impact": "Low",
        "forecast": "3.6%",
        "previous": "3.6%"
      },
      {
        "title": "MPC Member Ramsden Speaks",
        "currency": "GBP",
        "date": "2026-09-28T06:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Bowman Speaks",
        "currency": "USD",
        "date": "2026-09-28T08:15:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "ECB President Lagarde Speaks",
        "currency": "EUR",
        "date": "2026-09-28T09:30:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Cook Speaks",
        "currency": "USD",
        "date": "2026-09-28T13:25:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Barkin Speaks",
        "currency": "USD",
        "date": "2026-09-28T13:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "BRC Shop Price Index y/y",
        "currency": "GBP",
        "date": "2026-09-28T19:01:00-04:00",
        "impact": "Low",
        "forecast": "1.5%",
        "previous": "1.5%"
      },
      {
        "title": "Household Spending m/m",
        "currency": "AUD",
        "date": "2026-09-28T21:30:00-04:00",
        "impact": "Low",
        "forecast": "0.3%",
        "previous": "1.1%"
      },
      {
        "title": "Cash Rate",
        "currency": "AUD",
        "date": "2026-09-29T00:30:00-04:00",
        "impact": "High",
        "forecast": "4.60%",
        "previous": "4.35%"
      },
      {
        "title": "RBA Rate Statement",
        "currency": "AUD",
        "date": "2026-09-29T00:30:00-04:00",
        "impact": "High",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "RBA Press Conference",
        "currency": "AUD",
        "date": "2026-09-29T01:30:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "KOF Economic Barometer",
        "currency": "CHF",
        "date": "2026-09-29T03:00:00-04:00",
        "impact": "Low",
        "forecast": "106.0",
        "previous": "106.7"
      },
      {
        "title": "Spanish Flash CPI y/y",
        "currency": "EUR",
        "date": "2026-09-29T03:00:00-04:00",
        "impact": "Low",
        "forecast": "4.6%",
        "previous": "4.3%"
      },
      {
        "title": "M4 Money Supply m/m",
        "currency": "GBP",
        "date": "2026-09-29T04:30:00-04:00",
        "impact": "Low",
        "forecast": "0.1%",
        "previous": "-0.3%"
      },
      {
        "title": "Mortgage Approvals",
        "currency": "GBP",
        "date": "2026-09-29T04:30:00-04:00",
        "impact": "Low",
        "forecast": "56K",
        "previous": "56K"
      },
      {
        "title": "Net Lending to Individuals m/m",
        "currency": "GBP",
        "date": "2026-09-29T04:30:00-04:00",
        "impact": "Low",
        "forecast": "6.2B",
        "previous": "6.3B"
      },
      {
        "title": "10-y Bond Auction",
        "currency": "GBP",
        "date": "2026-09-29T05:02:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "5.16|3.6"
      },
      {
        "title": "Italian 10-y Bond Auction",
        "currency": "EUR",
        "date": "2026-09-29T05:04:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "4.10|1.6"
      },
      {
        "title": "German Buba President Nagel Speaks",
        "currency": "EUR",
        "date": "2026-09-29T06:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "ECB President Lagarde Speaks",
        "currency": "EUR",
        "date": "2026-09-29T07:00:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "GDP m/m",
        "currency": "CAD",
        "date": "2026-09-29T08:30:00-04:00",
        "impact": "Medium",
        "forecast": "0.0%",
        "previous": "0.3%"
      },
      {
        "title": "HPI m/m",
        "currency": "USD",
        "date": "2026-09-29T09:00:00-04:00",
        "impact": "Low",
        "forecast": "0.1%",
        "previous": "0.0%"
      },
      {
        "title": "S&P/CS Composite-20 HPI y/y",
        "currency": "USD",
        "date": "2026-09-29T09:00:00-04:00",
        "impact": "Low",
        "forecast": "2.2%",
        "previous": "2.1%"
      },
      {
        "title": "CB Consumer Confidence",
        "currency": "USD",
        "date": "2026-09-29T10:00:00-04:00",
        "impact": "Medium",
        "forecast": "89.2",
        "previous": "89.4"
      },
      {
        "title": "JOLTS Job Openings",
        "currency": "USD",
        "date": "2026-09-29T10:00:00-04:00",
        "impact": "Medium",
        "forecast": "7.23M",
        "previous": "7.27M"
      },
      {
        "title": "MPC Member Mann Speaks",
        "currency": "GBP",
        "date": "2026-09-29T11:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Bowman Speaks",
        "currency": "USD",
        "date": "2026-09-29T11:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "MPC Member Taylor Speaks",
        "currency": "GBP",
        "date": "2026-09-29T11:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Barr Speaks",
        "currency": "USD",
        "date": "2026-09-29T12:40:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Goolsbee Speaks",
        "currency": "USD",
        "date": "2026-09-29T13:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Gov Council Member Gravelle Speaks",
        "currency": "CAD",
        "date": "2026-09-29T13:20:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Musalem Speaks",
        "currency": "USD",
        "date": "2026-09-29T13:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Williams Speaks",
        "currency": "USD",
        "date": "2026-09-29T14:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Waller Speaks",
        "currency": "USD",
        "date": "2026-09-29T15:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "API Weekly Statistical Bulletin",
        "currency": "USD",
        "date": "2026-09-29T16:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Prelim Industrial Production m/m",
        "currency": "JPY",
        "date": "2026-09-29T19:50:00-04:00",
        "impact": "Low",
        "forecast": "1.4%",
        "previous": "0.1%"
      },
      {
        "title": "Retail Sales y/y",
        "currency": "JPY",
        "date": "2026-09-29T19:50:00-04:00",
        "impact": "Low",
        "forecast": "3.3%",
        "previous": "4.0%"
      },
      {
        "title": "ANZ Business Confidence",
        "currency": "NZD",
        "date": "2026-09-29T20:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "53.7"
      },
      {
        "title": "CPI m/m",
        "currency": "AUD",
        "date": "2026-09-29T21:30:00-04:00",
        "impact": "High",
        "forecast": "0.5%",
        "previous": "1.0%"
      },
      {
        "title": "CPI y/y",
        "currency": "AUD",
        "date": "2026-09-29T21:30:00-04:00",
        "impact": "High",
        "forecast": "4.1%",
        "previous": "3.5%"
      },
      {
        "title": "Trimmed Mean CPI m/m",
        "currency": "AUD",
        "date": "2026-09-29T21:30:00-04:00",
        "impact": "High",
        "forecast": "0.3%",
        "previous": "0.5%"
      },
      {
        "title": "Building Approvals m/m",
        "currency": "AUD",
        "date": "2026-09-29T21:30:00-04:00",
        "impact": "Low",
        "forecast": "-1.6%",
        "previous": "-3.6%"
      },
      {
        "title": "Private Sector Credit m/m",
        "currency": "AUD",
        "date": "2026-09-29T21:30:00-04:00",
        "impact": "Low",
        "forecast": "0.5%",
        "previous": "0.6%"
      },
      {
        "title": "Manufacturing PMI",
        "currency": "CNY",
        "date": "2026-09-29T21:30:00-04:00",
        "impact": "Low",
        "forecast": "50.1",
        "previous": "49.8"
      },
      {
        "title": "Non-Manufacturing PMI",
        "currency": "CNY",
        "date": "2026-09-29T21:30:00-04:00",
        "impact": "Low",
        "forecast": "49.2",
        "previous": "49.0"
      },
      {
        "title": "RatingDog Manufacturing PMI",
        "currency": "CNY",
        "date": "2026-09-29T21:45:00-04:00",
        "impact": "Low",
        "forecast": "51.7",
        "previous": "51.5"
      },
      {
        "title": "RatingDog Services PMI",
        "currency": "CNY",
        "date": "2026-09-29T21:45:00-04:00",
        "impact": "Low",
        "forecast": "51.3",
        "previous": "51.4"
      },
      {
        "title": "Housing Starts y/y",
        "currency": "JPY",
        "date": "2026-09-30T01:00:00-04:00",
        "impact": "Low",
        "forecast": "6.9%",
        "previous": "8.2%"
      },
      {
        "title": "German Import Prices m/m",
        "currency": "EUR",
        "date": "2026-09-30T02:00:00-04:00",
        "impact": "Low",
        "forecast": "0.6%",
        "previous": "0.2%"
      },
      {
        "title": "Current Account",
        "currency": "GBP",
        "date": "2026-09-30T02:00:00-04:00",
        "impact": "Low",
        "forecast": "-25.6B",
        "previous": "-22.1B"
      },
      {
        "title": "Final GDP q/q",
        "currency": "GBP",
        "date": "2026-09-30T02:00:00-04:00",
        "impact": "Low",
        "forecast": "0.4%",
        "previous": "0.4%"
      },
      {
        "title": "Revised Business Investment q/q",
        "currency": "GBP",
        "date": "2026-09-30T02:00:00-04:00",
        "impact": "Low",
        "forecast": "1.7%",
        "previous": "1.7%"
      },
      {
        "title": "German Retail Sales m/m",
        "currency": "EUR",
        "date": "2026-09-30T02:04:00-04:00",
        "impact": "Low",
        "forecast": "1.6%",
        "previous": "-3.4%"
      },
      {
        "title": "German Prelim CPI m/m",
        "currency": "EUR",
        "date": "2026-09-30T02:29:00-04:00",
        "impact": "Medium",
        "forecast": "0.5%",
        "previous": "0.2%"
      },
      {
        "title": "French Consumer Spending m/m",
        "currency": "EUR",
        "date": "2026-09-30T02:45:00-04:00",
        "impact": "Low",
        "forecast": "0.0%",
        "previous": "0.5%"
      },
      {
        "title": "French Prelim CPI m/m",
        "currency": "EUR",
        "date": "2026-09-30T02:45:00-04:00",
        "impact": "Low",
        "forecast": "-0.5%",
        "previous": "0.7%"
      },
      {
        "title": "German Unemployment Change",
        "currency": "EUR",
        "date": "2026-09-30T03:55:00-04:00",
        "impact": "Low",
        "forecast": "1K",
        "previous": "4K"
      },
      {
        "title": "UBS Economic Expectations",
        "currency": "CHF",
        "date": "2026-09-30T04:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "12.1"
      },
      {
        "title": "Italian Prelim CPI m/m",
        "currency": "EUR",
        "date": "2026-09-30T05:00:00-04:00",
        "impact": "Low",
        "forecast": "0.2%",
        "previous": "0.5%"
      },
      {
        "title": "FPC Meeting Minutes",
        "currency": "GBP",
        "date": "2026-09-30T05:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FPC Statement",
        "currency": "GBP",
        "date": "2026-09-30T05:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "German 10-y Bond Auction",
        "currency": "EUR",
        "date": "2026-09-30T05:32:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "3.39|1.5"
      },
      {
        "title": "Bank Holiday",
        "currency": "CAD",
        "date": "2026-09-30T08:00:00-04:00",
        "impact": "Holiday",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "ADP Non-Farm Employment Change",
        "currency": "USD",
        "date": "2026-09-30T08:15:00-04:00",
        "impact": "Medium",
        "forecast": "73K",
        "previous": "38K"
      },
      {
        "title": "Core PCE Price Index m/m",
        "currency": "USD",
        "date": "2026-09-30T08:30:00-04:00",
        "impact": "High",
        "forecast": "0.3%",
        "previous": "0.2%"
      },
      {
        "title": "Final GDP q/q",
        "currency": "USD",
        "date": "2026-09-30T08:30:00-04:00",
        "impact": "High",
        "forecast": "1.5%",
        "previous": "1.5%"
      },
      {
        "title": "Final GDP Price Index q/q",
        "currency": "USD",
        "date": "2026-09-30T08:30:00-04:00",
        "impact": "Medium",
        "forecast": "6.4%",
        "previous": "6.4%"
      },
      {
        "title": "Goods Trade Balance",
        "currency": "USD",
        "date": "2026-09-30T08:30:00-04:00",
        "impact": "Low",
        "forecast": "-116.3B",
        "previous": "-118.8B"
      },
      {
        "title": "Personal Income m/m",
        "currency": "USD",
        "date": "2026-09-30T08:30:00-04:00",
        "impact": "Low",
        "forecast": "0.5%",
        "previous": "0.4%"
      },
      {
        "title": "Personal Spending m/m",
        "currency": "USD",
        "date": "2026-09-30T08:30:00-04:00",
        "impact": "Low",
        "forecast": "0.8%",
        "previous": "0.2%"
      },
      {
        "title": "Prelim Wholesale Inventories m/m",
        "currency": "USD",
        "date": "2026-09-30T08:30:00-04:00",
        "impact": "Low",
        "forecast": "0.5%",
        "previous": "1.3%"
      },
      {
        "title": "SNB Quarterly Bulletin",
        "currency": "CHF",
        "date": "2026-09-30T09:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Chicago PMI",
        "currency": "USD",
        "date": "2026-09-30T09:45:00-04:00",
        "impact": "Low",
        "forecast": "51.2",
        "previous": "47.1"
      },
      {
        "title": "Gov Board Member Tschudin Speaks",
        "currency": "CHF",
        "date": "2026-09-30T10:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Crude Oil Inventories",
        "currency": "USD",
        "date": "2026-09-30T10:30:00-04:00",
        "impact": "Low",
        "forecast": "-0.7M",
        "previous": "3.0M"
      },
      {
        "title": "FOMC Member Barkin Speaks",
        "currency": "USD",
        "date": "2026-09-30T13:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Cook Speaks",
        "currency": "USD",
        "date": "2026-09-30T15:25:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "President Trump Speaks",
        "currency": "USD",
        "date": "2026-09-30T15:30:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Goolsbee Speaks",
        "currency": "USD",
        "date": "2026-09-30T17:10:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Building Consents m/m",
        "currency": "NZD",
        "date": "2026-09-30T17:45:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "-4.3%"
      },
      {
        "title": "FOMC Member Kashkari Speaks",
        "currency": "USD",
        "date": "2026-09-30T18:00:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Bank Holiday",
        "currency": "CNY",
        "date": "2026-09-30T19:01:00-04:00",
        "impact": "Holiday",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "BOJ Summary of Opinions",
        "currency": "JPY",
        "date": "2026-09-30T19:50:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Tankan Manufacturing Index",
        "currency": "JPY",
        "date": "2026-09-30T19:50:00-04:00",
        "impact": "Low",
        "forecast": "25",
        "previous": "22"
      },
      {
        "title": "Tankan Non-Manufacturing Index",
        "currency": "JPY",
        "date": "2026-09-30T19:50:00-04:00",
        "impact": "Low",
        "forecast": "36",
        "previous": "37"
      },
      {
        "title": "Final Manufacturing PMI",
        "currency": "JPY",
        "date": "2026-09-30T20:30:00-04:00",
        "impact": "Low",
        "forecast": "54.1",
        "previous": "54.1"
      },
      {
        "title": "Goods Trade Balance",
        "currency": "AUD",
        "date": "2026-09-30T21:30:00-04:00",
        "impact": "Low",
        "forecast": "2.00B",
        "previous": "1.92B"
      },
      {
        "title": "RBA Financial Stability Review",
        "currency": "AUD",
        "date": "2026-09-30T21:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Nationwide HPI m/m",
        "currency": "GBP",
        "date": "2026-10-01T02:00:00-04:00",
        "impact": "Low",
        "forecast": "0.0%",
        "previous": "0.2%"
      },
      {
        "title": "Commodity Prices y/y",
        "currency": "AUD",
        "date": "2026-10-01T02:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "15.5%"
      },
      {
        "title": "CPI m/m",
        "currency": "CHF",
        "date": "2026-10-01T02:30:00-04:00",
        "impact": "Medium",
        "forecast": "0.0%",
        "previous": "0.4%"
      },
      {
        "title": "Retail Sales y/y",
        "currency": "CHF",
        "date": "2026-10-01T02:30:00-04:00",
        "impact": "Low",
        "forecast": "2.1%",
        "previous": "2.3%"
      },
      {
        "title": "Spanish Manufacturing PMI",
        "currency": "EUR",
        "date": "2026-10-01T03:15:00-04:00",
        "impact": "Low",
        "forecast": "50.2",
        "previous": "49.5"
      },
      {
        "title": "Manufacturing PMI",
        "currency": "CHF",
        "date": "2026-10-01T03:30:00-04:00",
        "impact": "Low",
        "forecast": "56.3",
        "previous": "57.1"
      },
      {
        "title": "Italian Manufacturing PMI",
        "currency": "EUR",
        "date": "2026-10-01T03:45:00-04:00",
        "impact": "Low",
        "forecast": "50.1",
        "previous": "49.6"
      },
      {
        "title": "French Final Manufacturing PMI",
        "currency": "EUR",
        "date": "2026-10-01T03:50:00-04:00",
        "impact": "Low",
        "forecast": "50.3",
        "previous": "50.3"
      },
      {
        "title": "German Final Manufacturing PMI",
        "currency": "EUR",
        "date": "2026-10-01T03:55:00-04:00",
        "impact": "Low",
        "forecast": "53.8",
        "previous": "53.8"
      },
      {
        "title": "Final Manufacturing PMI",
        "currency": "EUR",
        "date": "2026-10-01T04:00:00-04:00",
        "impact": "Low",
        "forecast": "52.7",
        "previous": "52.7"
      },
      {
        "title": "Italian Monthly Unemployment Rate",
        "currency": "EUR",
        "date": "2026-10-01T04:00:00-04:00",
        "impact": "Low",
        "forecast": "5.8%",
        "previous": "5.8%"
      },
      {
        "title": "BOE Gov Bailey Speaks",
        "currency": "GBP",
        "date": "2026-10-01T04:00:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Final Manufacturing PMI",
        "currency": "GBP",
        "date": "2026-10-01T04:30:00-04:00",
        "impact": "Low",
        "forecast": "52.0",
        "previous": "52.0"
      },
      {
        "title": "Spanish 10-y Bond Auction",
        "currency": "EUR",
        "date": "2026-10-01T04:42:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "3.96|1.7"
      },
      {
        "title": "French 10-y Bond Auction",
        "currency": "EUR",
        "date": "2026-10-01T04:57:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "4.23|2.3"
      },
      {
        "title": "Unemployment Rate",
        "currency": "EUR",
        "date": "2026-10-01T05:00:00-04:00",
        "impact": "Low",
        "forecast": "6.4%",
        "previous": "6.4%"
      },
      {
        "title": "Challenger Job Cuts y/y",
        "currency": "USD",
        "date": "2026-10-01T05:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "-38.5%"
      },
      {
        "title": "German Buba President Nagel Speaks",
        "currency": "EUR",
        "date": "2026-10-01T06:35:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "MPC Member Mann Speaks",
        "currency": "GBP",
        "date": "2026-10-01T08:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Unemployment Claims",
        "currency": "USD",
        "date": "2026-10-01T08:30:00-04:00",
        "impact": "Medium",
        "forecast": "201K",
        "previous": "197K"
      },
      {
        "title": "FOMC Member Barkin Speaks",
        "currency": "USD",
        "date": "2026-10-01T09:05:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Collins Speaks",
        "currency": "USD",
        "date": "2026-10-01T09:05:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Schmid Speaks",
        "currency": "USD",
        "date": "2026-10-01T09:05:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Manufacturing PMI",
        "currency": "CAD",
        "date": "2026-10-01T09:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": "53.0"
      },
      {
        "title": "ECB President Lagarde Speaks",
        "currency": "EUR",
        "date": "2026-10-01T09:30:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Final Manufacturing PMI",
        "currency": "USD",
        "date": "2026-10-01T09:45:00-04:00",
        "impact": "Low",
        "forecast": "56.9",
        "previous": "57.0"
      },
      {
        "title": "FOMC Member Waller Speaks",
        "currency": "USD",
        "date": "2026-10-01T10:00:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "ISM Manufacturing PMI",
        "currency": "USD",
        "date": "2026-10-01T10:00:00-04:00",
        "impact": "Medium",
        "forecast": "54.8",
        "previous": "54.6"
      },
      {
        "title": "Construction Spending m/m",
        "currency": "USD",
        "date": "2026-10-01T10:00:00-04:00",
        "impact": "Low",
        "forecast": "0.0%",
        "previous": "-0.5%"
      },
      {
        "title": "ISM Manufacturing Prices",
        "currency": "USD",
        "date": "2026-10-01T10:00:00-04:00",
        "impact": "Low",
        "forecast": "72.9",
        "previous": "71.1"
      },
      {
        "title": "Omdia Total Vehicle Sales",
        "currency": "USD",
        "date": "2026-10-01T10:15:00-04:00",
        "impact": "Low",
        "forecast": "16.3M",
        "previous": "16.8M"
      },
      {
        "title": "Natural Gas Storage",
        "currency": "USD",
        "date": "2026-10-01T10:30:00-04:00",
        "impact": "Low",
        "forecast": "63B",
        "previous": "53B"
      },
      {
        "title": "SNB Chairman Schlegel Speaks",
        "currency": "CHF",
        "date": "2026-10-01T11:30:00-04:00",
        "impact": "Medium",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Jefferson Speaks",
        "currency": "USD",
        "date": "2026-10-01T13:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Bowman Speaks",
        "currency": "USD",
        "date": "2026-10-01T15:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Gov Council Member Rogers Speaks",
        "currency": "CAD",
        "date": "2026-10-01T15:05:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Cook Speaks",
        "currency": "USD",
        "date": "2026-10-01T15:30:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Bank Holiday",
        "currency": "CNY",
        "date": "2026-10-01T19:01:00-04:00",
        "impact": "Holiday",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Logan Speaks",
        "currency": "USD",
        "date": "2026-10-01T19:20:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Tokyo Core CPI y/y",
        "currency": "JPY",
        "date": "2026-10-01T19:30:00-04:00",
        "impact": "Medium",
        "forecast": "2.4%",
        "previous": "1.8%"
      },
      {
        "title": "Unemployment Rate",
        "currency": "JPY",
        "date": "2026-10-01T19:30:00-04:00",
        "impact": "Low",
        "forecast": "2.4%",
        "previous": "2.4%"
      },
      {
        "title": "Monetary Base y/y",
        "currency": "JPY",
        "date": "2026-10-01T19:50:00-04:00",
        "impact": "Low",
        "forecast": "-16.3%",
        "previous": "-15.7%"
      },
      {
        "title": "Spanish Unemployment Change",
        "currency": "EUR",
        "date": "2026-10-02T03:00:00-04:00",
        "impact": "Low",
        "forecast": "17.6K",
        "previous": "44.4K"
      },
      {
        "title": "Italian Retail Sales m/m",
        "currency": "EUR",
        "date": "2026-10-02T04:00:00-04:00",
        "impact": "Low",
        "forecast": "-0.1%",
        "previous": "-0.4%"
      },
      {
        "title": "Core CPI Flash Estimate y/y",
        "currency": "EUR",
        "date": "2026-10-02T05:00:00-04:00",
        "impact": "Medium",
        "forecast": "2.5%",
        "previous": "2.4%"
      },
      {
        "title": "CPI Flash Estimate y/y",
        "currency": "EUR",
        "date": "2026-10-02T05:00:00-04:00",
        "impact": "Medium",
        "forecast": "3.7%",
        "previous": "3.3%"
      },
      {
        "title": "Average Hourly Earnings m/m",
        "currency": "USD",
        "date": "2026-10-02T08:30:00-04:00",
        "impact": "High",
        "forecast": "0.3%",
        "previous": "0.3%"
      },
      {
        "title": "Non-Farm Employment Change",
        "currency": "USD",
        "date": "2026-10-02T08:30:00-04:00",
        "impact": "High",
        "forecast": "89K",
        "previous": "162K"
      },
      {
        "title": "Unemployment Rate",
        "currency": "USD",
        "date": "2026-10-02T08:30:00-04:00",
        "impact": "High",
        "forecast": "4.1%",
        "previous": "4.1%"
      },
      {
        "title": "Factory Orders m/m",
        "currency": "USD",
        "date": "2026-10-02T10:00:00-04:00",
        "impact": "Low",
        "forecast": "0.1%",
        "previous": "0.9%"
      },
      {
        "title": "FOMC Member Logan Speaks",
        "currency": "USD",
        "date": "2026-10-02T10:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "FOMC Member Goolsbee Speaks",
        "currency": "USD",
        "date": "2026-10-02T13:00:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "German Buba President Nagel Speaks",
        "currency": "EUR",
        "date": "2026-10-02T15:35:00-04:00",
        "impact": "Low",
        "forecast": "",
        "previous": ""
      },
      {
        "title": "Daylight Saving Time Shift",
        "currency": "AUD",
        "date": "2026-10-03T12:00:00-04:00",
        "impact": "Holiday",
        "forecast": "",
        "previous": ""
      }
    ]
  },
  "sources": {
    "worldBank": "World Bank World Development Indicators API v2 (format=json, mrv=1 for snapshot; history for GDP growth and inflation)",
    "fx": "Frankfurter / European Central Bank reference rates",
    "calendar": "Forex Factory weekly JSON (nfs.faireconomy.media), snapshot only"
  }
};
