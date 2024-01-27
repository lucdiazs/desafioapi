const input = document.getElementById("input");
const moneda = document.getElementById("moneda");
const button = document.getElementById("convertir");
const resultado = document.getElementById("resultado");

const apiDolarURL = "https://mindicador.cl/api/dolar";
const apiEuroURL = "https://mindicador.cl/api/euro";
const apiUfURL = "https://mindicador.cl/api/uf";

async function getLlamadodeApiDolar() {
    try {
        const res = await fetch(apiDolarURL);
        const valorDolar = await res.json();
        return valorDolar;
    } catch (error) {
        alert("El error es el siguiente:", error.message);
    }
}

async function getLlamadodeApiEuro() {
    try {
        const res = await fetch(apiEuroURL);
        const valorEuro = await res.json();
        return valorEuro;
    } catch (error) {
        alert("El error es el siguiente:", error.message);
    }
}

async function getLlamadodeApiUf() {
    try {
        const res = await fetch(apiUfURL);
        const valorUf = await res.json();
        return valorUf;
    } catch (error) {
        alert("El error es el siguiente:", error.message);
    }
}
button.addEventListener("click", () => {
    if (moneda.value === "dolar") {
        async function convertirDolar() {
            const dolarDia = await getLlamadodeApiDolar();
            const varDolarDia = dolarDia.serie[0].valor;
            const valorInput = input.value;
            const conversionDolar = (valorInput / varDolarDia).toFixed(4);
            resultado.innerHTML = `Total: ${conversionDolar}`;
        }
        convertirDolar();
    } else if (moneda.value === "euro") {
        async function convertirEuro() {
            const euroDia = await getLlamadodeApiEuro();
            const varEuroDia = euroDia.serie[0].valor;
            const valorInput = input.value;
            const conversionEuro = (valorInput / varEuroDia).toFixed(4);
            resultado.innerHTML = `Total: ${conversionEuro}`;
        }
        convertirEuro();
    } else if (moneda.value === "uf") {
        async function convertirUf() {
            const ufDia = await getLlamadodeApiUf();
            const varUfDia = ufDia.serie[0].valor;
            const valorInput = input.value;
            const conversionUf = (valorInput / varUfDia).toFixed(4);
            resultado.innerHTML = `Total: ${conversionUf}`;
        }
        convertirUf();
    } 
    
});

async function getAndCreateDataToChart() {
    const res = await fetch("https://mindicador.cl/api/dolar");
    const data = await res.json();    
    const lastTenEntries = data.serie.slice(0, 10);
    const labels = lastTenEntries.map(entry => entry.fecha);
    const valores = lastTenEntries.map(entry => entry.valor);

    const datasets = [
        {
            label: "Historial últimos 10 días",
            borderColor: "rgb(255, 99, 132)",
            data: valores
        }
    ];

    return { labels, datasets };
}

async function renderGrafica() {
    const data = await getAndCreateDataToChart();
    const config = {
        type: "line",
        data
    };

    const myChart = document.getElementById("myChart");
    myChart.style.backgroundColor = "white";
    new Chart(myChart, config);
}

renderGrafica();
