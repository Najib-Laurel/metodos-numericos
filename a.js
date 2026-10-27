const ejercicios = {
  19: {
    nombre: "Distancia de un vehículo",
    descripcion: "Integra la velocidad durante 7 segundos. La tabla del documento está en mi/h; la distancia en millas se obtiene dividiendo la integral por 3600.",
    x: [0,1,2,3,4,5,6,7],
    y: [0,14,39,69,95,114,129,139],
    unidad: "mi/h · s",
    factor: 1/3600,
    resultadoUnidad: "mi",
    interpretacion: "La integral de velocidad respecto al tiempo da distancia. Para estos datos en mi/h y segundos, divide el resultado entre 3600 para obtener millas."
  },
  20: {
    nombre: "Trabajo de una banda elástica",
    descripcion: "El trabajo se aproxima integrando la fuerza respecto al desplazamiento. Los datos del documento están en pulgadas y libras.",
    x: [0,0.4,0.8,1.2,1.6,2.0,2.4,2.8],
    y: [0,0.85,1.30,1.60,1.87,2.14,2.34,2.52],
    unidad: "lb·in",
    factor: 1,
    resultadoUnidad: "lb·in",
    interpretacion: "El área bajo la curva fuerza-desplazamiento representa el trabajo realizado por la fuerza."
  },
  21: {
    nombre: "Área de un perfil topográfico",
    descripcion: "Coordenadas digitalizadas aproximadas del perfil. El resultado es una estimación y depende de la lectura de la gráfica original.",
    x: [1,2,3,4,5,6,7,8,9,10],
    y: [1.3,3.7,4.6,4.4,2.7,2.5,3.6,5.3,6.0,5.9],
    unidad: "u²",
    factor: 1,
    resultadoUnidad: "u²",
    interpretacion: "El área aproximada bajo el perfil depende de la calidad de los puntos digitalizados; no son mediciones exactas."
  },
  22: {
    nombre: "Longitud de una catenaria",
    descripcion: "Longitud del cable modelado por y = a cosh(x/a), con a = 24 ft, desde x = -12 ft hasta x = 26 ft. Se tabula el integrando sqrt(1 + y'²) = cosh(x/24).",
    x: [-12,-7.25,-2.5,2.25,7,11.75,16.5,21.25,26],
    y: [],
    unidad: "ft",
    factor: 1,
    resultadoUnidad: "ft",
    interpretacion: "La longitud de una curva se calcula integrando sqrt(1 + (y')²) respecto a x."
  },
  23: {
    nombre: "Caudal de una tubería",
    descripcion: "Se integra 2πr v(r), con v(r) = 80(1 − r/R)^(1/7) y R = 0.25 in. La tabla corresponde al integrando del caudal.",
    x: [],
    y: [],
    unidad: "in³/s",
    factor: 1,
    resultadoUnidad: "in³/s",
    interpretacion: "El caudal se obtiene integrando la velocidad sobre el área transversal circular. El perfil dado puede converger lentamente cerca de la pared."
  },
  24: {
    nombre: "Longitud de una cardioide",
    descripcion: "Para b = 5, la rapidez de la cardioide paramétrica se reduce a 20|sin(t/2)|. Se integra desde 0 hasta 2π.",
    x: [],
    y: [],
    unidad: "unidades de longitud",
    factor: 1,
    resultadoUnidad: "unidades",
    interpretacion: "La longitud de la curva paramétrica se obtiene integrando la rapidez sqrt((x')² + (y')²) respecto al parámetro t."
  },
  25: {
    nombre: "Energía potencial gravitatoria",
    descripcion: "Para m = 500 kg, g₀ = 9.81 m/s², R = 6 371 000 m y altura h = 800 000 m, se integra m g₀ R²/(R+y)².",
    x: [],
    y: [],
    unidad: "J",
    factor: 1,
    resultadoUnidad: "J",
    interpretacion: "La integral representa el cambio de energía potencial al elevar el satélite desde la superficie hasta 800 km."
  },
  26: {
    nombre: "Superficie de un lago",
    descripcion: "El intervalo indicado es de 40 a 260 millas y se solicitan anchuras cada 20 millas. El documento no incluye una tabla oficial de anchuras: ingresa los datos que midas en la figura.",
    x: [40,60,80,100,120,140,160,180,200,220,240,260],
    y: [],
    unidad: "mi²",
    factor: 1,
    resultadoUnidad: "mi²",
    interpretacion: "El resultado depende de las anchuras digitalizadas. El documento da como referencia 9 940 mi², pero no una tabla única de mediciones."
  },
  27: {
    nombre: "Volumen de un objeto alargado",
    descripcion: "Se estima V = π∫r² dz usando r = d/2. Los datos de diámetro del documento están en pulgadas.",
    x: [0,1,2,3,4,5,6,7,8,9,10,11,12],
    y: [0,2.6,3.2,4.8,5.6,6.0,6.2,6.0,5.6,4.8,3.3,2.6,0],
    unidad: "in³",
    factor: 1,
    resultadoUnidad: "in³",
    interpretacion: "El volumen se estima integrando el área de cada sección circular: πr². El área superficial real de revolución requiere considerar la pendiente del perfil."
  }
};

const $ = id => document.getElementById(id);
let grafica = null;

function prepararDatos(id) {
  const e = ejercicios[id];
  let x = e.x.slice(), y = e.y.slice();
  if (id === "22") y = x.map(v => Math.cosh(v / 24));
  if (id === "23") {
    x = Array.from({length: 9}, (_, i) => 0.25 * i / 8);
    y = x.map(r => 2 * Math.PI * r * 80 * Math.pow(Math.max(0, 1-r/0.25), 1/7));
  }
  if (id === "24") {
    x = Array.from({length: 9}, (_, i) => 2 * Math.PI * i / 8);
    y = x.map(t => 20 * Math.abs(Math.sin(t/2)));
  }
  if (id === "25") {
    const m=500, g=9.81, R=6371000, h=800000;
    x = Array.from({length: 9}, (_, i) => h * i / 8);
    y = x.map(v => m*g*R*R/Math.pow(R+v,2));
  }
  if (id === "27") y = y.map(d => Math.PI * Math.pow(d/2, 2));
  return {x,y};
}

function cargarEjercicio() {
  const id = $("ejercicio").value;
  const e = ejercicios[id];
  const datos = prepararDatos(id);
  $("descripcion").textContent = e.descripcion;
  $("valoresX").value = datos.x.join(", ");
  $("valoresY").value = datos.y.length ? datos.y.map(v => Number(v.toPrecision(8))).join(", ") : "";
  $("unidad").value = e.unidad;
  $("mensaje").textContent = "";
  $("mensaje").className = "message";
  $("resultados").hidden = true;
}

function leerLista(texto) {
  if (!texto.trim()) throw new Error("Completa los dos campos de datos.");
  const lista = texto.trim().split(/[,\s;]+/).filter(Boolean).map(Number);
  if (lista.some(v => !Number.isFinite(v))) throw new Error("Hay un valor que no es numérico. Revisa los datos ingresados.");
  return lista;
}

function validar(x,y) {
  if (x.length !== y.length) throw new Error("Las listas de x e y deben tener la misma cantidad de valores.");
  if (x.length < 2) throw new Error("Ingresa al menos dos puntos.");
  for (let i=1;i<x.length;i++) {
    if (!(x[i] > x[i-1])) throw new Error("Los valores de x deben estar ordenados de menor a mayor y no repetirse.");
  }
  const h = x[1]-x[0];
  for (let i=2;i<x.length;i++) {
    if (Math.abs((x[i]-x[i-1])-h) > 1e-7*Math.max(1,Math.abs(h))) {
      throw new Error("Los valores de x deben tener espaciamiento uniforme. Revisa los intervalos.");
    }
  }
  return h;
}

function trapecio(y,h) {
  let suma = (y[0]+y[y.length-1])/2;
  for(let i=1;i<y.length-1;i++) suma += y[i];
  return h*suma;
}

function simpson13(y,h) {
  const n=y.length-1;
  if(n%2!==0) throw new Error("Simpson 1/3 necesita un número par de subintervalos.");
  let suma=y[0]+y[n];
  for(let i=1;i<n;i++) suma += (i%2===0?2:4)*y[i];
  return h*suma/3;
}

function simpson38(y,h) {
  const n=y.length-1;
  if(n%3!==0) throw new Error("Simpson 3/8 necesita un número de subintervalos múltiplo de 3.");
  let suma=y[0]+y[n];
  for(let i=1;i<n;i++) suma += (i%3===0?2:3)*y[i];
  return 3*h*suma/8;
}

function simpsonCombinado(y,h) {
  const n=y.length-1;
  if(n%2===0) return {valor:simpson13(y,h), detalle:"Simpson 1/3 aplicado a todos los subintervalos"};
  if(n%3===0) return {valor:simpson38(y,h), detalle:"Simpson 3/8 aplicado a todos los subintervalos"};
  if(n>=5) {
    const n13=n-3;
    const parte13=simpson13(y.slice(0,n13+1),h);
    const parte38=simpson38(y.slice(n13),h);
    return {valor:parte13+parte38,detalle:`Simpson 1/3 en ${n13} subintervalos y Simpson 3/8 en 3 subintervalos`};
  }
  throw new Error("No se puede combinar Simpson con este número de subintervalos. Usa n par o múltiplo de 3.");
}

function mostrarResultados(x,y,h,calculos,unidad,nota="") {
  $("resultados").hidden=false;
  $("tarjetas").innerHTML="";
  calculos.forEach(c=>{
    const div=document.createElement("div");
    div.className="result-card";
    div.innerHTML=`<div class="method">${c.nombre}</div><div class="value">${c.valor.toLocaleString("es-BO",{maximumFractionDigits:6,minimumFractionDigits:6})}</div><div class="unit">${unidad}</div><div class="detail">${c.detalle||"Cálculo completado"}</div>`;
    $("tarjetas").appendChild(div);
  });
  const cuerpo=$("tablaDatos");
  cuerpo.innerHTML="";
  for(let i=0;i<x.length;i++){
    const peso=(i===0||i===x.length-1)?0.5:1;
    const tr=document.createElement("tr");
    [i,fmt(x[i]),fmt(y[i]),peso,fmt(h*peso*y[i])].forEach(v=>{
      const td=document.createElement("td");td.textContent=v;tr.appendChild(td);
    });
    cuerpo.appendChild(tr);
  }
  $("interpretacion").innerHTML=`<strong>Interpretación:</strong> ${ejercicios[$("ejercicio").value].interpretacion} ${nota}`;
  dibujarGrafica(x,y);
}

function fmt(n){return Number(n).toLocaleString("es-BO",{maximumFractionDigits:8});}

function dibujarGrafica(x,y) {
  const ctx=$("grafica").getContext("2d");
  if(grafica) grafica.destroy();
  grafica=new Chart(ctx,{
    type:"line",
    data:{labels:x.map(v=>fmt(v)),datasets:[{
      label:"Datos ingresados",
      data:y,
      borderColor:"#2463eb",
      backgroundColor:"rgba(36,99,235,.13)",
      fill:true,tension:0,pointRadius:4,pointBackgroundColor:"#13b8a6",borderWidth:2
    }]},
    options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:true}},scales:{
      x:{title:{display:true,text:"x"},grid:{display:false}},
      y:{title:{display:true,text:"y"},beginAtZero:false}
    }}
  });
}

function calcular() {
  try {
    const id=$("ejercicio").value;
    const x=leerLista($("valoresX").value);
    const y=leerLista($("valoresY").value);
    const h=validar(x,y);
    const metodo=$("metodo").value;
    const unidad=$("unidad").value.trim() || "unidades";
    const lista=[];
    const agregar=(nombre,fn,detalle="")=>{try{lista.push({nombre,valor:fn(),detalle});}catch(e){lista.push({nombre,valor:null,detalle:e.message});}};
    if(metodo==="trapecio"||metodo==="todos") agregar("Trapecio compuesto",()=>trapecio(y,h));
    if(metodo==="simpson13"||metodo==="todos") agregar("Simpson 1/3",()=>simpson13(y,h));
    if(metodo==="simpson38"||metodo==="todos") agregar("Simpson 3/8",()=>simpson38(y,h));
    if(metodo==="auto"||metodo==="todos") agregar("Simpson combinado",()=>simpsonCombinado(y,h).valor,simpsonCombinado(y,h).detalle);
    const validos=lista.filter(v=>v.valor!==null);
    if(!validos.length) throw new Error(lista.map(v=>v.detalle).filter(Boolean).join(" "));
    const e=ejercicios[id];
    let factor=e.factor||1, unidadFinal=unidad;
    if(id==="19" && unidad.toLowerCase().includes("mi/h")) {factor=1/3600;unidadFinal="mi";}
    const escalados=validos.map(v=>({...v,valor:v.valor*factor}));
    const errores=lista.filter(v=>v.valor===null).map(v=>`${v.nombre}: ${v.detalle}`).join(" ");
    mostrarResultados(x,y,h,escalados,unidadFinal,errores?`Métodos no calculados: ${errores}`:"");
    $("mensaje").textContent=`Cálculo realizado correctamente. Intervalo uniforme h = ${fmt(h)}.`;
    $("mensaje").className="message success";
  } catch(e) {
    $("mensaje").textContent=e.message;
    $("mensaje").className="message error";
    $("resultados").hidden=true;
  }
}

$("ejercicio").addEventListener("change",cargarEjercicio);
$("restaurar").addEventListener("click",cargarEjercicio);
$("calcular").addEventListener("click",calcular);
$("prueba").addEventListener("click",()=>{
  $("valoresX").value="0, 0.5, 1, 1.5, 2";
  $("valoresY").value="0, 0.25, 1, 2.25, 4";
  $("unidad").value="unidades";
  $("metodo").value="todos";
  $("mensaje").textContent="Prueba cargada: f(x) = x² entre 0 y 2. El resultado exacto es 2.6666667.";
  $("mensaje").className="message success";
});
cargarEjercicio();
