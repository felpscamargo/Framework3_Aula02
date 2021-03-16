$(document).ready(function () {
    $('#BotaoImportar').click(function () {
        lerJson();
    });
    $('#BotaoIncluir').click(function () {
        IncluirJson();
    });
    $('#BotaoConsultar').click(function () {
        ConsultarJson();
    });
    $('#BotaoExcluir').click(function () {
        ExcluirJson();
    });
});
function lerJson() {
    let xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", "http://localhost:8081/ListaDisciplinas");
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let ListaDisciplinas = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";
            for (let ny = 0; ny < ListaDisciplinas.length; ny++) {
                tbody.innerHTML += `<td scope="row">${ListaDisciplinas[ny].id}</td>` +
                    `<td scope="row">${ListaDisciplinas[ny].Descricao}</td>` +
                    `<td scope="row">${formataData(ListaDisciplinas[ny].Data)}</td>` +
                    `<td scope="row">${formataValorReais(ListaDisciplinas[ny].Valor)}</td>` +
                    `<td scope="row">${ListaDisciplinas[ny].Presencial}</td>`;
            }
        }
    };
    xmlhttp2.send();
}
function IncluirJson() {
    let codigo = document.getElementById('codigo').value;
    let descricao = document.getElementById('descricao').value;
    let data = document.getElementById('data').value;
    let valor = parseFloat(document.getElementById('valor').value);
    let presencial = document.getElementById('presencial').value;
    let tbody = document.getElementById("Resultados");
    tbody.innerHTML += `<td scope="row">${codigo}` +
        `<td scope="row">${descricao}` +
        `<td scope="row">${formataData(data)}` +
        `<td scope="row">${formataValorReais(valor)}` +
        `<td scope="row">${presencial}`;
    let Titulo = {
        id: codigo,
        Descricao: descricao,
        Data: data,
        Valor: valor,
        Presencial: presencial
    };
    let json = JSON.stringify(Titulo);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8081/ListaDisciplinas", true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
}
function ConsultarJson() {
    let xmlhttp2 = new XMLHttpRequest();
    let codigo = document.getElementById("codigo").value;
    xmlhttp2.open("GET", "http://localhost:8081/ListaDisciplinas/" + codigo, true);
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let ListaDisciplinas = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";
            tbody.innerHTML = `<td scope = "row">${ListaDisciplinas.id}</td>` +
                `<td scope = "row">${ListaDisciplinas.Descricao}</td>` +
                `<td scope = "row">${formataData(ListaDisciplinas.Data)}</td>` +
                `<td scope = "row">${formataValorReais(ListaDisciplinas.Valor)}</td>` +
                `<td scope = "row">${ListaDisciplinas.Presencial}</td>`;
        }
    };
    xmlhttp2.send();
}
function ExcluirJson() {
    let xmlhttp2 = new XMLHttpRequest();
    let codigo = document.getElementById("codigo").value;
    xmlhttp2.open("DELETE", "http://localhost:8081/ListaDisciplinas/" + codigo, true);
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Título excluido com sucesso.");
        }
    };
    xmlhttp2.send();
}
function formataData(str) {
    return str.split("-").reverse().join("/");
}
function formataValorReais(valor) {
    return valor.toLocaleString("pt-BR", { style: 'currency', currency: "BRL" });
}
