[TOC]

# Vis&atilde;o geral
O prop&oacute;sito deste documento &aacute; fornecer uma vis&atilde;o geral de funcionalidades e uso da ferramenta criada pela equipe de arquitetura da **CTIS** alocados no **Minist&eacute;rio da Integra&ccedil;&atilde;o Nacional**.

## Escopo
O escopo do gerador de c&oacute;digos &eacute; o de criar uma estrutura b&aacute;sica, bem como ferramentas para contru&ccedil;&atilde;o de uma aplica&ccedil;&atilde;o seguindo os padr&otilde;es de codificau&cceedil;&atilde;o e boas pr&aacute;ticas adotadas pela equipe arquitetural.

# Instala&ccedil;&atilde;o
Para utiliza&ccedil;&atilde;o do gerador &eacute; necess&aacute;rio a instala&ccedil;&atilde;o de alguns aplicativos. O primeiro e essencial para prosseguir com o desenvolvimento dos projetos, &eacute; necess&aacute;rio a instala&ccedil;&atilde;o do [nodeJS][1].

## Instala&ccedil;&atilde;o no Linux
Aqueles que necessitam da insta&ccedil;&atilde;o neste sistema operacional dever&atilde;o utilizar o [NVM][2], gerenciador de vers&atilde;es do [NodeJS][1] mantido pela comunidade. Existem duas formas para insta&ccedil;&atilde;o, utilizando o [Wget][3] ou o [Curl][4]. Por motivos pr&aacute;ticos, utilizaremos o Wget, visto que est&aacute; instalado por padr&otilde;o em todas as distribui&ccedil;&atilde;es do mercado.
Utilizando esses procedimentos, n&atilde;o &eacute; neces&aacute;rio permissionamento de super usu&aacute;rio, portanto &eacute; expressamente **proibido** qualquer tipo de utilização do comando **sudo** precedendo seus comandos, visto que a instala&ccedil;&atilde;o estar&aacute;

``` bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash
```

Por&eacute;m &eacute; poss&iacute;vel tamb&eacute;m instalar utilizando o curl, como o comando abaixo:

``` bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash
```

Efetuada a instala&ccedil;&atilde;o, &eacute; necess&aacute;rio fazer com que o terminal reconhe&ccedil;a as novas configura&ccedil;&otilde;es que est&atilde;o dispon&iacute;veis em seu ```~/.bashrc```. Para tal existem duas op&ccedil;&otilde;es, reiniciar a sess&atilde;o ou recarregar manualmente utilizando o comando abaixo:

``` bash
source ~/.nvm/nvm.sh
```

Com o NVM instalado, &eacute; necess&aacute;rio instalar e colocar em uso o nodeJS, bem como o seu gerenciador de pacotes o [NPM][5]. Sempre utilizaremos a vers&atilde;o est&aacute;vel do nodeJS, ent&atilde;o para instal&aacute;-lo usaremos o seguinte comando:

``` bash
nvm install stable
```

Ap&oacute;s o processo de instala&ccedil;&atilde;o, &eacute; necess&eacute;rio instruir o NVM qual ser&aacute; a vers&atilde;o utilizada para as opera&ccedil;&otilde;es. Para tal ,devemos utilizar o comando abaixo:

``` bash
nvm use stable
```

## Instala&ccedil;&atilde;o no Windows
Aqueles que necessitam da insta&ccedil;&atilde;o neste sistema operacional, dever&atilde;o inicialmente checar a arquitura de seu sistema operacional, pois ser&aacute; essencial para descobrir qual a vers&atilde;o que ser&aacute; baixada no site do nodeJS. [NVM for Windows][6]

### Instala&ccedil;&atilde;o das depend&ecirc;ncias
Baixadas e instaladas as depend&ecirc;ncias do gerador de c&oacute;digos, &eacute; necess&aacute;rio agora deter o gerador de c&oacute;digos, dispon&iacute;vel no reposit&oacute;rio da oganiza&ccedil;&atilde;o. para tal necesitaremos dar checkout do reposit&oacute;rio onde est&aacute; alocado o c&oacute;digo do gerador. No linux, poder&aacute; ser efetuado com o seguinte comando:

``` bash
svn co https://misrv42.integracao.gov.br/svn/MI-ARQUITETURA/branches/C%C3%B3digo%20Fonte/generator-projeto/
```

Efetuado o _checkout_, entre na pasta por linha de comando e execute o seguinte:

``` bash
cd generator-projeto && npm link
```

O comando acima informa ao NPM que o diret&oacute;rio em quest&atilde;o est&aacute; na lista de pacotes dispon&iacute;veis para uso pelo node.js, e assim poder&aacute; ser utilizado.

Outros pacotes precisam estar presentes globalmente para execu&ccedil;&atilde;o do gerador e desenvolvimento de aplica&ccedil;&atilde;es baseadas nele, bem como os padr&otilde;es de desenvolvimento definidos pela institui&ccedil;&atilde;o. S&atilde;o eles:

``` bash
npm install -g yeoman-generator chalk yosay mocha bower jade grunt-cli
```

De todas as dependências instaladas, três são muito importantes para o desenvolvimento utilizando o gerador de código. São elas o [`bower`][9], o [`grunt`][7] e o [`jade`][8]. O [`bower`][9] gerenciará a dependência de assets(bibliotecas, icones) da aplicação, enquanto o [`grunt`][7] executará, de acordo com o projeto, diversas tarefas(minimificação de código, melhorias em imagens, concatenação de arquivos, etc), e o [`jade`][8], biblioteca que interpreta pseudo-marcações e as tranforma em `HTML`, permitindo a componentização.

## Iniciando um projeto
Instalada todas as dependências, deveremos iniciar um projeto pelo [`yeoman`][10]. Para tal, deveremos executar no terminal o comando abaixo: 

**Linux**
``` bash
mkdir novo_projeto && cd $_ && yo projeto
```

**Windows**
``` bash
mkdir novo_projeto && cd novo_projeto && yo projeto
```

Após concluir a execução[^warning-creational], uma estrutura de diretórios será criada. Seu conteúdo está descrito em [Estrutura Geral](#estrutura-geral).

## Estrutura Geral

```
+ novo_projeto
|-- Gruntfile.js
|-- bower.json
|-- node_modules
|-- package.json
`-- src
    |-- asset
    |   |-- javascript
    |   |   `-- application
    |   |       |-- common
    |   |       |   |-- application.js
    |   |       |   |-- controller
    |   |       |   |-- directive
    |   |       |   |-- filter
    |   |       |   |-- service
    |   |       |   |   |-- constant
    |   |       |   |   `-- value
    |   |       |   `-- view
    |   |       `-- modules.json
    |   |-- library
    |   `-- stylesheet
    `-- view
```

### Gruntfile.js
O arquivo `Gruntfile.js` possui todas as tarefas que precisam ser executadas para que a aplicação funcione corretamente, bem como tarefas que criarão o código final(javascript, stylesheets e jades), que deverçao ser entregues nas builds.

### bower.json
O arquivo `bower.json` é o que contém as dependências de bibliotecas `javascript` e  `stylesheet` que devem ser baixadas para o projeto específico. **As dependências atuais no arquivo não devem ser removidas**.

Para adicionar novas dependencias ao projeto, consulte o repositório do bower, e de acordo com a necessidade, as insira no arquivo.

### node_modules
O diretório `node_modules`

### package.json
O arquivo `packges.json`

### src
O diretório `src`

### src/asset/application
O diretório `src/asset/application`

### src/asset/application/modules.js
O diretório `src/asset/application/modules.js`

### src/asset/application/common
O diretório `src/asset/application/common`

### src/asset/library
O diretório `src/asset/library`

### src/asset/stylesheet
O diretório `src/asset/stylesheet`


## Funcionalidades

### Module
Um `module` ser&aacute; a estrutura b&aacute;sica para in&iacute;cio dos projetos.

``` bash
yo projeto:module [modulo_pai [nome_do_modulo [--skip]]]
```

### Constant
Uma `constant`

``` bash
yo projeto:constant [modulo [nome_da_constante [valor_da_constante [--skip]]]]
```

### Controller
Um `controller`

``` bash
yo projeto:controller [modulo [nome_da_controller  [--skip]]]
```

### Decorator
Um `decorator`

``` bash
yo projeto:decorator [modulo [decorator [--skip]]]
```

### Directive
Uma `directive`

``` bash
yo projeto:directive [modulo [nome_da_directive  [--skip]]]
```

### Factory
Uma `factory`

``` bash
yo projeto:factory [modulo [nome_da_factory  [--skip]]]
```

### Filter
Um `filter`

``` bash
yo projeto:filter [modulo [nome_do_filter [--skip]]]
```

### Provider
Um `provider`

``` bash
yo projeto:provider [modulo [nome_dO_provider [--skip]]]
```

### Service
Um `service`

``` bash
yo projeto:constant [modulo [nome_da_service [--skip]]]
```

### Value
Um `value`

``` bash
yo projeto:value [modulo [nome_da_value [valor_da_value [--skip]]]]
```

### View
Uma `view`

``` bash
yo projeto:view [modulo [nome_da_view [-- skip]]]
```


# Equipe respons&aacute;vel:
 - [F&aacute;bio Luciano](mailto:fabio@naoimporta.com)

# Workarounds


Existe a possibilidade de algumas redes bloquearem o acesso ao git pelo seu próprio protocolo `git://`, como pode ser visualizado no trecho abaixo.

```
bower ECMDERR     Failed to execute "git ls-remote --tags --heads git://github.com/yui/pure-release.git", exit code of #128 fatal: unable to connect to github.com: github.com[0: 192.30.252.130]: errno=No such file or directory
```

Para tal, podemos configurar o git para que substitua as chamadas utilizando ` https://`. Execute o comando abaixo no terminar(linux) ou prompt(windows).

``` bash
git config --global url."https://".insteadOf git://
```

[1]: https://nodejs.org/                                "nodeJS"
[2]: https://github.com/creationix/nvm                  "NVM"
[3]: https://www.gnu.org/s/wget/                        "Wget"
[4]: http://curl.haxx.se                                "Curl"
[5]: https://www.npmjs.com/                             "NPMJS"
[6]: https://github.com/coreybutler/nvm-windows         "NVM for Windows"
[7]: http://gruntjs.com/                                "GruntJS"
[8]: http://jade-lang.com/                              "Jade Lang"
[9]: http://bower.io/                                   "Bower"
[10]: http://yeoman.io/                                 "Yeoman"

### Observações
[^warning-creational]: O comando só deverá ser executado uma única vez por projeto, visto que poderá ser catastrófica as modificações ao projeto, caso executado.

