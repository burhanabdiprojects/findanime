

const api = 'https://api.jikan.moe/v3/anime/';

/* The loading screen once a search is initiated */
function loadanimesearch() {
    document.getElementById("searchpageenter").style.display = "none";
    document.getElementById("loadingscreensearch").style.display = "flex";
    setTimeout(function() { animesearch(); }, 1000);
}

let animesearch = () => {

    document.getElementById("searchagainbtn").style.display = "flex";
    document.getElementById("loadingscreensearch").style.display = "none";
    document.getElementById("resultsshown").style.display = "grid";
    document.getElementById("resultsshown").innerHTML = "";

    let anisea = document.getElementById("animesearch").value;
    console.log(anisea);
    let all = "all";
    fetch("https://api.jikan.moe/v3/search/anime?q=" + anisea + "&page=1")
    .then(res => res.json())
    .then(data => {
        simpleresults(data);
        document.getElementById("animesearch").value = "";
    })
    .catch(error => console.log(error));
}

var idarr = [];
var moreinfolink = [];

function simpleresults(data){

    let arrlength = data.results.length;
    let noresult = 0;
    console.log(data);


    for(let i = 0; i < arrlength; i++){

        if(data.results[i].rated != "Rx" && data.results[i].rated != "R+" && data.results[i].mal_id != undefined){

            idarr.push(data.results[i].mal_id);

            if(idarr[i] != null || undefined){
                let newtitle = document.createElement("h5");
            newtitle.innerHTML = data.results[i].title;
            let newimg = document.createElement("img");
            newimg.src = data.results[i].image_url;
            

            let newtype = document.createElement("p");

            if(data.results[i].type == "TV"){
            newtype.innerHTML = "TV Series";
            }else if (data.results[i].type == "Special"){
            newtype.innerHTML = "Special";
            }else{
            newtype.innerHTML = data.results[i].type;
            }

            let overalldiv = document.createElement("div");
            let imgdiv = document.createElement("div");
            let details = document.createElement("div");

            let newrating = document.createElement("p");
            if (data.results[i].score != null){
            newrating.innerHTML = "Score: " + data.results[i].score;
            }else {
            newrating.innerHTML = "Score: Not Rated Yet";
            }


            let newrated = document.createElement("p");
            newrated.innerHTML = "Rated: " + data.results[i].rated;
            let newairing = document.createElement("p");

            imgdiv.appendChild(newimg);
            details.appendChild(newtitle);
            details.appendChild(newtype);

            if(data.results[i].type != "Movie"){
                let newepisodes = document.createElement("p");
                newepisodes.innerHTML = "Episodes: " + data.results[i].episodes;
                details.appendChild(newepisodes);
            }else{}

            details.appendChild(newrating);
            details.appendChild(newrated);

            if(data.results[i].airing == true){
                newairing.innerHTML = "Currently Airing";
                newairing.style.color = "green"; 
                details.appendChild(newairing);
                }else if (data.results[i].airing == false){
                newairing.innerHTML = "Not Airing";  
                newairing.style.color = "red";  
                details.appendChild(newairing);
                }else{}


                
            

                var newmoreinfo = document.createElement("p");


                passthrough(i);
            
                details.appendChild(newmoreinfo);
        

            imgdiv.classList.add("imgwrapper");
            overalldiv.classList.add("resultswrapper");
            details.classList.add("searchdetails");

            document.getElementById("resultsshown").appendChild(overalldiv);
            overalldiv.appendChild(imgdiv);
            overalldiv.appendChild(details);
            }else{}

      


        }else{
            
        noresult++; 
        }


        function passthrough (a){

            if (idarr[a] != null || undefined){
                
            moreinfolink[a] = document.createElement("a");
            moreinfolink[a].id = idarr[a];
            

            newmoreinfo.appendChild(moreinfolink[a]);
            moreinfolink[a].innerHTML = "Find Out More";
            moreinfolink[a].href = "animepage.html";} else {}

            
        }

    }
    
    for(let c = 0; c < moreinfolink.length; c++){
        moreinfolink[c].onclick = function() {moreinfo(moreinfolink[c].id);
    }


    if(noresult >= arrlength){
        let overalldiv = document.createElement("div");
        let nores = document.createElement("h3");
        let noresp = document.createElement("p");

        overalldiv.classList.add("noresults");

        nores.innerHTML = "No Results";
        noresp.innerHTML = "Maybe try a less specific search?";
        document.getElementById("resultsshown").appendChild(overalldiv);
        overalldiv.appendChild(nores);
        overalldiv.appendChild(noresp);
        
    }else{}


}

}



var secondgenr = false;
var thirdgenr = false;

function togglegenres(a) {
    if(a == 2){
    document.getElementById("addgenre2").style.display = "none";
    document.getElementById("genre2").style.display = "inline-block";
    secondgenr = true;
    document.getElementById("addgenre3").style.display = "inline-block";
    document.getElementById("lessgenre2").style.display = "inline-block";
    }else if (a == 3){
    document.getElementById("addgenre3").style.display = "none";
    document.getElementById("genre3").style.display = "inline-block";
    thirdgenr = true;
    document.getElementById("lessgenre3").style.display = "inline-block";
    document.getElementById("lessgenre2").style.display = "none";
    }else if (a == 4){
    document.getElementById("lessgenre3").style.display = "none";
    document.getElementById("genre3").style.display = "none";
    thirdgenr = false;
    document.getElementById("lessgenre2").style.display = "inline-block";
    document.getElementById("addgenre3").style.display = "inline-block";
    }
    else if (a == 5){
    document.getElementById("lessgenre2").style.display = "none";
    document.getElementById("genre2").style.display = "none";
    secondgenr = false;
    document.getElementById("addgenre2").style.display = "inline-block";
    document.getElementById("addgenre3").style.display = "none";
    }
}

function loadanimefind() {
    document.getElementById("findpageenter").style.display = "none";
    document.getElementById("loadingscreenfind").style.display = "flex";
    setTimeout(function() { animefind(); }, 1000);
}

function animefind() {

    document.getElementById("findagainbtn").style.display = "flex";
    document.getElementById("loadingscreenfind").style.display = "none";
    document.getElementById("resultsshown").style.display = "grid";
 
    
    let minrating = document.getElementById("minrating").value;
    let releasedate = document.getElementById("reldate").value;
    let genreid = document.getElementById("genre").value;

    if(secondgenr == false){
    var genre2 = "ignore";
    }else {
    var genre2 = document.getElementById("genre2").value;}

    if(thirdgenr == false){
    var genre3 = "ignore";
    }else {
    var genre3 = document.getElementById("genre3").value;}

    let type = document.getElementById("showtype").value;
    
    console.log(releasedate);
    console.log(genreid);
    console.log("https://api.jikan.moe/v3/genre/anime/" + genreid + "/1")
    
   
    
    let minimumeps = document.getElementById("mineps").value;
    
    fetch("https://api.jikan.moe/v3/genre/anime/" + genreid + "/1")
    .then(res => res.json())
    .then(data => {
    
        console.log(genre2 + genre3);
    console.log(data);
    
    
    results(data, minrating, minimumeps, releasedate, genre2, genre3, type);  
    
    
    
    }
    
    )
    .catch(error => console.log("ERROR" + error.stack))

    
}
    
    
    


function results(data, min, eps, rdate, gen2, gen3, typ) { 

    let arrlength = data.anime.length;
    let noresult = true;
    console.log(data);
    console.log("Gens are " + gen2 + gen3);

    for(i = 0; i < arrlength; i++){
    
        if(data.anime[i].airing_start != null){
        var startdate = data.anime[i].airing_start.substring(0, 4);
        } else {
        var startdate = 0;
        console.log("airing date is null");
        }

        let genlength = data.anime[i].genres.length;

        var meetsgen2 = false;
        var meetsgen3 = false;

        for(g = 0; g < genlength; g++){
        

            if(data.anime[i].genres[g].mal_id != null){
                if(gen2 == data.anime[i].genres[g].mal_id){
                    meetsgen2 = true;
                } else {}

                if(gen3 == data.anime[i].genres[g].mal_id){
                    meetsgen3 = true;
                } else {}

                }else{
        
            }

        }
    
    
    if(data.anime[i].rated != "Rx" && (data.anime[i].score > min || min == "all" ) && (data.anime[i].episodes >= eps || eps == "all") && startdate != 0 && (startdate == rdate || rdate == "all" || (rdate == "before2013" && startdate < "2013")) && (gen2 == "ignore" || meetsgen2 == true) && (gen3 == "ignore" || meetsgen3 == true) && (typ == data.anime[i].type || typ == "all")  ) {
        
        var genrecheck;

        for(l = 0; l < data.anime[i].genres.length; l++){      /* Removing any innappropriate results by banning certain genres.*/
            switch(data.anime[i].genres[l].mal_id){
                case 9:
                case 12:
                case 14:
                case 33:
                case 34:
                case 35:
                    genrecheck = "ban";
                break;
                default:
                    genrecheck = "fine";
            }
        }

        console.log(genrecheck)

        if(genrecheck != "ban"){

            let newtitle = document.createElement("h5");
            newtitle.innerHTML = data.anime[i].title;
            let newimg = document.createElement("img");
            newimg.src = data.anime[i].image_url;

            let newtype = document.createElement("p");

            if(data.anime[i].type == "TV"){
                newtype.innerHTML = "TV Series";
            }else if (data.anime[i].type == "Special"){
                newtype.innerHTML = "Special";
            }else{
                newtype.innerHTML = data.anime[i].type;
            }

            let overalldiv = document.createElement("div");
            let imgdiv = document.createElement("div");
            let details = document.createElement("div");

            
            let newrating = document.createElement("p");
            if (data.anime[i].score != null){
                newrating.innerHTML = "Score: " + data.anime[i].score;
            }else {
                newrating.innerHTML = "Score: Not Rated Yet";
            }

            imgdiv.appendChild(newimg);
            details.appendChild(newtitle);
            details.appendChild(newtype);

            if(data.anime[i].type != "Movie"){
                let newepisodes = document.createElement("p");
                newepisodes.innerHTML = "Episodes: " + data.anime[i].episodes;
                details.appendChild(newepisodes);
            }else{}

            details.appendChild(newrating);
            
            idarr.push(data.anime[i].mal_id);
            idarr[i] = data.anime[i].mal_id;
            console.log("pushed to idarr is " + data.anime[i].mal_id);
            
            var newmoreinfo = document.createElement("p");

            passthrough(i);

            details.appendChild(newmoreinfo);

            imgdiv.classList.add("imgwrapper");
            overalldiv.classList.add("resultswrapper");
            details.classList.add("searchdetails");

            document.getElementById("resultsshown").appendChild(overalldiv);
            overalldiv.appendChild(imgdiv);
            overalldiv.appendChild(details);

            noresult = false;

        }else{}

        }else{
        
    }


    }

    function passthrough (a){
                
        if(idarr[a] != null || undefined){
            moreinfolink[a] = document.createElement("a");
            moreinfolink[a].id = idarr[a];
            
    
            newmoreinfo.appendChild(moreinfolink[a]);
            moreinfolink[a].innerHTML = "Find Out More";
            moreinfolink[a].href = "animepage.html";
            moreinfolink[a].onclick = function() {moreinfo(moreinfolink[a].id)}
        }else{}

    }

  

    if(noresult == true || document.getElementById("resultsshown").innerHTML == ""){
        let overalldiv = document.createElement("div");
        let nores = document.createElement("h3");
        let noresp = document.createElement("p");

        overalldiv.classList.add("noresults");

        nores.innerHTML = "No Results";
        noresp.innerHTML = "Maybe try a less specific search?";
        document.getElementById("resultsshown").appendChild(overalldiv);
        overalldiv.appendChild(nores);
        overalldiv.appendChild(noresp);

    }else{}

}






function moreinfo (val) {

    if (localStorage.getItem("id") != null) {
        localStorage.removeItem("id");
    }else {}


    localStorage.setItem("id",val);
    
}


function generateanipage () { 


    var showid = localStorage.getItem("id");
    console.log(showid);



    fetch('https://api.jikan.moe/v3/anime/' + showid)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.getElementById("animeimg").src = data.image_url;
        document.getElementById("animetitle").innerHTML = data.title_english;
        document.getElementById("japanesetitle").innerHTML = data.title_japanese;

        if(data.premiered != null){
            document.getElementById("animepremiered").innerHTML = "Premiered " + data.premiered;}
        else{
            document.getElementById("animepremiered").style.display = "none" ;
        }

        var animegenres = [];
        var genrelist = "<strong>Genres</strong>: ";

        for (i = 0; i < data.genres.length; i++){
            animegenres.push(data.genres[i].name);
        }

        for (i = 0; i < animegenres.length; i++){
            if (i != animegenres.length - 1){
                genrelist += animegenres[i];
                genrelist += ", ";}
            else{
                genrelist += animegenres[i]
            }
        }

        document.getElementById("animegenres").innerHTML = genrelist 





        document.getElementById("animesynopsis").innerHTML = data.synopsis;
        document.getElementById("animeratingscore").innerHTML = "<strong>Score:</strong> " + data.score + "(" + data.scored_by + " votes)";
        document.getElementById("animeagerating").innerHTML = "<strong>Age Rating:</strong> " + data.rating;

        document.getElementById("animeair").innerHTML = "<strong>Aired:</strong> " + data.aired.string;

        document.getElementById("animeairstatus").innerHTML = "<strong>Status: </strong> " + data.status;

        console.log(data.type + " is the data type");

        if(data.type == "TV"){
            document.getElementById("animetype").innerHTML = "<strong>Type:</strong> TV Series";
            }else if (data.type == "Special"){
            document.getElementById("animetype").innerHTML = "<strong>Type:</strong> " + data.type;
            }else{
            document.getElementById("animetype").innerHTML = "<strong>Type:</strong> " + data.type;
            }

            

        let trailer = data.trailer_url;


        if(trailer != null){
        document.getElementById("animetrailer").innerHTML = "<iframe width=\"560\" height=\"315\" src=\"" + trailer + "\"frameborder=\"0\"  allowfullscreen></iframe>"
        }else{
        document.getElementById("animetrailer").style.display = "none";
        }


        var related = document.getElementById("relatedanime");

        let relatedtext = document.createElement("p");
        relatedtext.classList.add("bigp");
        relatedtext.classList = "relatedtext";

        if (data.title_english != null || undefined){
        relatedtext.innerHTML = "Like " + data.title_english + "? You might also like these anime.";
        } else {
        relatedtext.innerHTML = "Like this? You might also like these anime.";   
        }

        related.appendChild(relatedtext);


        fillrelated(data, related);

    })

    .catch (error => console.log("ERROR" + error.stack));

}


function fillrelated(data, related) {
    var numberofrel = 0;

    for(i = 0; i < 10; i++){
    if(numberofrel <= 5 && data.related.Prequel != null && data.related.Prequel[i] != null) {
        let reldiv= document.createElement("div");
        let reltitle = document.createElement("h4");
        let rellink = document.createElement("a");

        reltitle.appendChild(rellink);
        let relimg = document.createElement("img");

        related.appendChild(reldiv);
        reldiv.appendChild(reltitle);
        reldiv.appendChild(relimg);
        let rel1id = data.related.Prequel[i].mal_id;


        rellink.innerHTML = data.related.Prequel[i].name;

        rellink.onclick = function () {moreinfo(rel1id)}

        rellink.href = "animepage.html";

        fetch('https://api.jikan.moe/v3/anime/' + rel1id)
        .then(res => res.json())
        .then(data => {relimg.src = data.image_url; console.log(relimg.src);})
        .catch(error => console.log(error.stack)); 
        
        numberofrel++;
    } else if(numberofrel <= 5 && data.related.Sequel != null && data.related.Sequel[i] != null) {
        let reldiv= document.createElement("div");
        let reltitle = document.createElement("h4");
        let relimg = document.createElement("img");
        let rellink = document.createElement("a");

        related.appendChild(reldiv);
        reldiv.appendChild(reltitle);
        reldiv.appendChild(relimg);
        let rel1id = data.related.Sequel[i].mal_id;
        console.log(rel1id);

        reltitle.appendChild(rellink);

        rellink.onclick = function () {moreinfo(rel1id)}

        rellink.href = "animepage.html";

        rellink.innerHTML = data.related.Sequel[i].name;

        fetch('https://api.jikan.moe/v3/anime/' + rel1id)
        .then(res => res.json())
        .then(data => {relimg.src = data.image_url; console.log(relimg.src);})
        .catch(error => console.log(error.stack)); 
        
        numberofrel++;
    } else if(data.related.Other != null && data.related.Other[i] != null && numberofrel <= 5 ){
        let reldiv= document.createElement("div");
        let reltitle = document.createElement("h4");
        let relimg = document.createElement("img");
        let rellink = document.createElement("a");

        related.appendChild(reldiv);
        reldiv.appendChild(reltitle);
        reldiv.appendChild(relimg);
        let rel1id = data.related.Other[i].mal_id;
        console.log(rel1id);
        reltitle.appendChild(rellink);


        rellink.onclick = function () {moreinfo(rel1id)}

        rellink.href = "animepage.html";
        rellink.innerHTML = data.related.Other[i].name;

        fetch('https://api.jikan.moe/v3/anime/' + rel1id)
        .then(res => res.json())
        .then(data => {relimg.src = data.image_url; console.log(relimg.src)})
        .catch(error => console.log(error.stack)); 
        
        numberofrel++;
        
    }else if(data.related["Side story"] != null && data.related["Side story"][i] != null && numberofrel <= 5 ){
        let reldiv= document.createElement("div");
        let reltitle = document.createElement("h4");
        let relimg = document.createElement("img");
        let rellink = document.createElement("a");
    
        related.appendChild(reldiv);
        reldiv.appendChild(reltitle);
        reldiv.appendChild(relimg);
        reltitle.appendChild(rellink);

        let rel1id = data.related["Side story"][i].mal_id;
        console.log(rel1id);


        rellink.onclick = function () {moreinfo(rel1id)}

        rellink.href = "animepage.html";
    
        rellink.innerHTML = data.related["Side story"][i].name;
    
        fetch('https://api.jikan.moe/v3/anime/' + rel1id)
        .then(res => res.json())
        .then(data => {relimg.src = data.image_url; console.log(relimg.src)})
        .catch(error => console.log(error.stack)); 
        
        numberofrel++;
        
    }else if(data.related["Parent story"] != null && data.related["Parent story"][i] != null && numberofrel <= 5 ){
            let reldiv= document.createElement("div");
            let reltitle = document.createElement("h4");
            let relimg = document.createElement("img");
            let rellink = document.createElement("a");
        
            related.appendChild(reldiv);
            reldiv.appendChild(reltitle);
            reldiv.appendChild(relimg);
            let rel1id = data.related["Parent story"][i].mal_id;
            console.log(rel1id);

            reltitle.appendChild(rellink);



            rellink.onclick = function () {moreinfo(rel1id)}

        
            rellink.innerHTML = data.related["Parent story"][i].name;

            rellink.href = "animepage.html";
        
            fetch('https://api.jikan.moe/v3/anime/' + rel1id)
            .then(res => res.json())
            .then(data => {relimg.src = data.image_url; console.log(relimg.src)})
            .catch(error => console.log(error.stack)); 
            
            numberofrel++;
            
            }
    

        if(numberofrel == 0){
            document.getElementById("relatedanime").style.display = "none";
        }
}
}

