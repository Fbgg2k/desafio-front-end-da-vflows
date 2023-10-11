// Função para buscar o endereço pelo CEP

function buscarEnderecoPorCEP() {
  var cep = document.getElementById("cep").value;
  var url = "https://viacep.com.br/ws/" + cep + "/json/";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.erro) {
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("municipio").value = data.localidade;
        document.getElementById("estado").value = data.uf;
      } else {
        alert("CEP não encontrado.");
      }
    })
    .catch(error => {
      console.error("Erro ao buscar o CEP:", error);
    });
}

// Adicione um evento de mudança ao campo de CEP
document.getElementById("cep").addEventListener("change", buscarEnderecoPorCEP);


// Função para adicionar um novo formulário de produtos

function adicionarProdutoFormulario() {
  // Clone o primeiro formulário de produtos
  var novoFormularioProduto = $(".produto:first").clone();

  // Adicione a classe "borda-produto" ao novo formulário
  novoFormularioProduto.addClass("borda-produto");

  // Limpe os valores preenchidos no novo formulário
  novoFormularioProduto.find("input").val("");
  novoFormularioProduto.find("select").val("Unidade");

  // Adicione o novo formulário de produtos após o último formulário
  $(".produto:last").after(novoFormularioProduto);

  // Adicione um evento de clique para o botão de exclusão do novo formulário
  novoFormularioProduto.find(".btn-excluir-produto").click(function () {
    $(this).closest(".produto").remove();
  });
}

// Função para calcular o valor total com base no valor unitário e na quantidade em estoque

function calcularValorTotal(input) {
  var linhaProduto = input.closest(".produto");
  var qtdEstoque = parseFloat(linhaProduto.querySelector("#qtdEstoque").value) || 0;
  var valorUnitario = parseFloat(linhaProduto.querySelector("#valorUnitario").value) || 0;
  var valorTotal = qtdEstoque * valorUnitario;
  linhaProduto.querySelector("#valorTotal").value = valorTotal.toFixed(2);
}

// Função para remover um formulário de produtos

$(document).on("click", ".btn-remover-produto", function () {
  $(this).closest(".produto").remove();
});

// Função de adicionar formulário de produtos ao botão de adicionar

$(document).on("click", ".btn-adicionar-produto", adicionarProdutoFormulario);

function adicionarAnexo(nome) {
    var tbody = document.getElementById('anexosTbody');
    var row = tbody.insertRow();

    var cell1 = row.insertCell(0);
    cell1.innerHTML = nome;

    var cell2 = row.insertCell(1);
    var visualizarBtn = document.createElement('button');
    visualizarBtn.innerHTML = '<i class="fas fa-eye"></i>';
    visualizarBtn.onclick = function () {
        // Adicione a lógica para visualizar o anexo aqui
    };
    var excluirBtn = document.createElement('button');
    excluirBtn.innerHTML = '<i class="fas fa-trash"></i>';
    excluirBtn.onclick = function () {
        // Adicione a lógica para excluir o anexo aqui
        tbody.deleteRow(row.rowIndex);
    };
    cell2.appendChild(visualizarBtn);
    cell2.appendChild(excluirBtn);
}



var anexoCount = 0;

function arquivoSelecionado() {
  var fileInput = document.getElementById("fileInput");
  var arquivo = fileInput.files[0];

  if (!arquivo) {
    alert("Selecione um arquivo antes de prosseguir.");
    return;
  }

  // Armazena temporariamente o arquivo no sessionStorage

  var nomeDocumento = arquivo.name;
  var blobDocumento = arquivo;
  sessionStorage.setItem(nomeDocumento, blobDocumento);

  anexoCount++;

  adicionarLinhaAnexo(nomeDocumento);

  // Limpe o valor do seletor de arquivo
  fileInput.value = null;
}


// Função adicionar anexo com nome e icones visualizar, nome e excluir anexo

function adicionarLinhaAnexo(nomeDocumento) {
  var tbody = document.getElementById("anexosTbody");
  var newRow = document.createElement("tr");

  // Crie células para o nome do documento e ações
  var nomeDocumentoCell = document.createElement("td");
  nomeDocumentoCell.textContent = nomeDocumento;
  nomeDocumentoCell.classList.add("nomeDocumento"); // Adicione a classe

  var acoesCell = document.createElement("td");

  var botaoExcluir = document.createElement("button");
  var iconeExcluir = document.createElement("i");
  iconeExcluir.className = "fas fa-trash";
  botaoExcluir.appendChild(iconeExcluir);
  botaoExcluir.className = "btn btn-danger";
  botaoExcluir.onclick = function () {
    excluirAnexo(newRow);
  };

  var botaoVisualizar = document.createElement("button");
  var iconeVisualizar = document.createElement("i");
  iconeVisualizar.className = "fas fa-eye";
  botaoVisualizar.appendChild(iconeVisualizar);
  botaoVisualizar.className = "btn btn-primary";
  botaoVisualizar.onclick = function () {
    visualizarAnexo(nomeDocumento);
  };

  acoesCell.appendChild(botaoExcluir);
  acoesCell.appendChild(botaoVisualizar);

  newRow.appendChild(nomeDocumentoCell);
  newRow.appendChild(acoesCell);
  tbody.appendChild(newRow);
}

// Função para excluir um anexo

function excluirAnexo(row) {
  var tbody = document.getElementById("anexosTbody");
  tbody.removeChild(row);
}

// Função Adicionar anexo

function visualizarAnexo(nomeDocumento) {
  // Obtenha o conteúdo do documento armazenado no sessionStorage
  var blobDocumento = sessionStorage.getItem(nomeDocumento);

  if (!blobDocumento) {
    alert("Documento não encontrado: " + nomeDocumento);
    return;
  }

  // Crie um Blob a partir do conteúdo do documento
  var blob = new Blob([blobDocumento]);

  // Crie um URL de objeto para o Blob
  var url = URL.createObjectURL(blob);

  // Crie um link para download
  var link = document.createElement("a");
  link.href = url;
  link.download = nomeDocumento;
  link.textContent = "Baixar " + nomeDocumento;

  // Adicione o link ao documento
  document.body.appendChild(link);

  // Clique no link automaticamente para iniciar o download
  link.click();
}



// Função para formatar o JSON com os dados do fornecedor

function formatarJSON() {
  var dadosFornecedor = {
    razaoSocial: document.getElementById("razaosocial").value,
    nomeFantasia: document.getElementById("nomefantasia").value,
    cnpj: document.getElementById("cnpj").value,
    inscricaoEstadual: document.getElementById("inscricaoestadual").value,
    inscricaoMunicipal: document.getElementById("inscricaomunicipal").value,
    nomeContato: document.getElementById("pessoacontato").value,
    telefoneContato: document.getElementById("telefone").value,
    emailContato: document.getElementById("email").value,
    cep: document.getElementById("cep").value,
    endereco: document.getElementById("endereco").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    municipio: document.getElementById("municipio").value,
    estado: document.getElementById("estado").value,
  };
  return dadosFornecedor;
}

// Função para formatar o JSON com os dados dos produtos

function formatarJSONProdutos() {
  var produtos = [];
  var produtosElements = document.querySelectorAll('.produto');

  produtosElements.forEach(function (produtoElement, indice) {
    var produto = {
      indice: indice + 1,
      descricaoProduto: produtoElement.querySelector('input[name="nomeProduto[]"]').value,
      unidadeMedida: produtoElement.querySelector('select[name="undMedida[]"]').value,
      qtdeEstoque: produtoElement.querySelector('input[name="qtdEstoque[]"]').value,
      valorUnitario: produtoElement.querySelector('input[name="valorUnitario[]"]').value,
      valorTotal: produtoElement.querySelector('input[name="valorTotal[]"]').value,
    };
    produtos.push(produto);
  });

  return produtos;
}

// Função para formatar o JSON com os dados dos anexos

function formatarJSONAnexos() {
  var anexos = [];
  // Percorra os itens armazenados no sessionStorage
  for (var i = 0; i < sessionStorage.length; i++) {
    var nomeDocumento = sessionStorage.key(i);
    var blobDocumento = sessionStorage.getItem(nomeDocumento);
    
    // Crie um objeto de anexo
    var anexo = {
      indice: i + 1,
      nomeArquivo: nomeDocumento,
      blobArquivo: blobDocumento,
    };
    anexos.push(anexo);
  }
  return anexos;
}

// Antes de chamar exibirTodasInformacoes(), chame formatarJSONAnexos() para obter os anexos.
var anexos = formatarJSONAnexos();

// Em seguida, você pode adicioná-los ao JSON final, por exemplo:
var todasInformacoesJSON = {
  // ... outros dados do fornecedor, produtos, etc.
  anexos: anexos, // Adicione a lista de anexos ao JSON final
};

// Agora você pode chamar exibirTodasInformacoes() com os anexos incluídos.
exibirTodasInformacoes(todasInformacoesJSON);


// Função para lidar com o clique no botão "Salvar Fornecedor"
function salvarFornecedor() {
  exibirTodasInformacoes();
  $('#loadingModal').modal('hide'); // Abre o modal de loading use "show" ou "hide" para abrir o loading de envio
  
  // Aqui você pode enviar os dados para o servidor ou fazer outras ações necessárias
  // Após o envio, você pode fechar o modal de loading: $('#loadingModal').modal('hide');
}

// Função para exibir todas as informações em um único JSON

function exibirTodasInformacoes() {
  var dadosFornecedor = formatarJSON();
  var produtos = formatarJSONProdutos();
  var anexos = formatarJSONAnexos();

  var todasInformacoesJSON = {
    razaoSocial: dadosFornecedor.razaoSocial,
    nomeFantasia: dadosFornecedor.nomeFantasia,
    cnpj: dadosFornecedor.cnpj,
    inscricaoEstadual: dadosFornecedor.inscricaoEstadual,
    inscricaoMunicipal: dadosFornecedor.inscricaoMunicipal,
    nomeContato: dadosFornecedor.nomeContato,
    telefoneContato: dadosFornecedor.telefoneContato,
    emailContato: dadosFornecedor.emailContato,
    cep: dadosFornecedor.cep, 
    endereco: dadosFornecedor.endereco, 
    numero: dadosFornecedor.numero, 
    complemento: dadosFornecedor.complemento,
    bairro: dadosFornecedor.bairro, 
    municipio: dadosFornecedor.municipio, 
    estado: dadosFornecedor.estado, 
    produtos: produtos,
    anexos: anexos, // Inclua os anexos no JSON
  };

  // Exibe o JSON na tela ou faz o que você preferir
  var jsonString = JSON.stringify(todasInformacoesJSON, null, 2);
  alert(jsonString); // Exibe o JSON em um alert, você pode personalizar isso


  // Se preferir exibir o JSON em um elemento HTML, crie um elemento no seu HTML e defina o conteúdo lá
  // Exemplo: document.getElementById("jsonOutput").textContent = jsonString;
}

