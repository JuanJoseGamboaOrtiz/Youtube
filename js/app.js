let url="";
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4287edead4msh6c1fa3fcbc1c92bp178950jsn45924d193931',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

const boton=document.querySelector('.input-icon');
boton.addEventListener('click', video)



async function video(e){
    let textoBusqueda= '';
    const input=document.querySelector('.input');
    let texto=input.value;
    texto=texto.split(" ").join("%20");
    url=`https://youtube138.p.rapidapi.com/search/?q=${texto}&hl=en&gl=US`;
    id= await obtenerId(url); 
    infoVideo= await obtenerInfo(id);
    actualizarTitulo(infoVideo);
    actualizarVideo(id);
    actualizarIcono(infoVideo);
    actualizarNombreCanal(infoVideo);
    llenarComentarios(id);
    llenarVideoRelacionados(id);
}

async function obtenerInfo(id){

    url=`https://youtube138.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        var info= result
    } catch (error) {
        console.error(error);
    }

    return info
}


async function obtenerId(url){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        var idVideo= result.contents[0].video.videoId;
    } catch (error) {
        console.error(error);
    }

    return idVideo
}


function actualizarVideo(id){

    const video= document.querySelector('iframe');
    video.src= `https://www.youtube.com/embed/${id}`
}


function actualizarTitulo(info){
    const {title}=info;
    titulo=document.querySelector('.contenedor-video h1');
    titulo.textContent=title;
}

function actualizarIcono(info){
    const {author}=info;
    const logo = document.querySelector('.logo-canal img');
    logo.src=author.avatar[0].url;
}
function actualizarNombreCanal(info){
    const {author}=info;
    const nombreCanal= document.querySelector('.nombre-canal');
    nombreCanal.textContent=author.title;
}

async function llenarComentarios(id){
    
    const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${id}`;

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        var info= result.comments;
    } catch (error) {
        console.error(error);
    }
    contenedor=document.querySelector('.comentarios');
    contenedor.innerHTML="";

    //Crear div
    info.forEach(comentario=>{
        const divComentario= document.createElement('DIV');
        const parrafo=document.createElement('P');
        parrafo.textContent=comentario.content;   
        
        divComentario.appendChild(parrafo);
        contenedor.appendChild(divComentario);
    })

}

async function llenarVideoRelacionados(id){
    const contenedorVideos= document.querySelector('.contenedor-videos');

    url = `https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`;

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        var info= result.contents;
    } catch (error) {
        console.error(error);
    }

    contenedorVideos.innerHTML=`
    <iframe  class=""width="560" height="315" src="https://www.youtube.com/embed/${info[0].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <iframe  class=""width="560" height="315" src="https://www.youtube.com/embed/${info[1].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <iframe  width="560" height="315" src="https://www.youtube.com/embed/${info[2].video.videoId} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;



}