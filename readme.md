Resumen:
He realizado las secciones que me pedian en la tarea mas un header que os permite meter un logo menu y el carrito que abre un drawer en el que podeis ver productos y acceder a la pagina de carrito donde hay mas configuraciones en cuanto a las 2 secciones dinamicas he añadido los settings que me ha dado tiempo aunque me habria gustado añadir mas settings junto a mas estilos en la pagina.

Configuraciones necesarias para ver todo:
Dado que en liquid no se puede acceder de forma absoluta a cualquier metacampo de un producto he tenido que especificar su value y su key en el snippet product-metafield con crear un metacampo con estos valores ya se podrian ver test_data.snowboard_length.value ya que he usado una tienda de test data para ver como se ve todo.
He borrado la carpeta .shopify para que no os de conflicto con vuestra tienda de prueba y asi solo tendreis que hacer shopify theme dev -s y os creara una carpeta para vuestra tienda.

Notas:
El proyecto a estado bien y me ha gustado hacerlo pero por falta de tiempo y por otras responsabilidades no he podido añadir todo lo que hubiera querido.
En cuanto a algun que otro problema mas que nada ha sido investigar si podia detectar cualquier tipo de metacampo sin especificacion y un problema al generar el settings data_json que he solucionado al hacer shopify theme pull -d. Tambien el tema de las fuentes he intentado pasarlo por una serie de filtros pero aunque me salian el nombre de las fuentes como tal y aplicadas en el font-family no se aplicaban en el front no me dio tiempo a investigar porque.