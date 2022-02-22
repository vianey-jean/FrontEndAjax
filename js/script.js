// Afficher la formulaire de connexion
$("#btnConnex").click(function(){
   // Récupérer le texte afficher sur le bouton de connexion
   var texteBtnConn = $("#btnConnex").html();
   if(texteBtnConn == "Connexion"){
      $(".formConnexion").css({"display":"block"});
      //Cacher les autres formulaires s'ils son affiché
      $(".formInscription").css({"display":"none"}); 
      $(".formMdpOublie").css({"display":"none"}); 
       $(".pub").css({"display":"none"});  

    }else{
      $("#btnConnex").html("Connexion");       
      location.replace("index.html");    
   }
               
});

// Désactiver le comportement par defaut du lien <a href=""></a> du mot de passe oublié
$("#lien_mdp_oublie").click(function(e){
   e.preventDefault();
});

// Afficher la formulaire Mot de passe oublié
$("#mot_de_passe_oublie").click(function(){
   $(".formMdpOublie").css({"display":"block"}); 
   //Cacher les autres formulaires s'ils son affiché
   $(".formConnexion").css({"display":"none"}); 
   $(".formInscription").css({"display":"none"});
    $(".pub").css({"display":"none"});           
});

// Retour au mode non connécté au click du bouton abandon
$(".abandon").click(function(){
   location.replace("index.html");
});

// Désactiver l'envoie de la formulaire
$(".formulaire").on('submit',function(e){      
   e.preventDefault(); // Première méthode qui désactive le comportement par défaut de la formulaire
   //return false; // Deuxième méthode 
});

// Afficher l'aide pour le mot de passe
$(".lien_aide_Mdp").click(function(e){
   e.preventDefault();
});

// Afficher Message confirmant l'envoi d'e-mail pour l'inscription
$("#btn_validerInscript").click(verifChampsFormInscript);

// // Afficher Message confirmant l'envoi d'e-mail pour la réinitialisation de mot de passe
$("#btn_validerMdpO").click(verifChampsFormMdpO);

/*********  Debut d'affichage d'ade  *********/

$("#aideMdpInscript").click(function(){
   afficherAideMdp("Demande d'inscription");
});

$("#aideMdpO").click(function(){
   afficherAideMdp("Mot de passe oublié")
});

$("#aideTelInscript").click(function(){
   afficherAideTel("Demande d'inscription");
});



/*Fonction d'affichage de l'aide pour le mot de passe*/
function afficherAideMdp(message){
   $(".modal-title").html(message);
   $("#modalMessage").html("Le mot de passe doit contenir au moins :" +
                        "<ul>"+
                           "<li>une lettre majuscule</li>"+
                           "<li>une lettre minuscule</li>"+
                           "<li>un chiffre</li>"+
                           "<li>une caractère spéciale</li>"+
                        "</ul>"
    );
   
   $("#maModale").modal('toggle');
   $("#maModale").modal('show');
}

// Fonction d'affichage de l'aide pour le numero de téléphone
function afficherAideTel(message){
   $(".modal-title").html(message);
   $("#modalMessage").html("Le numero de telephone doit être constitué que de 10 chiffres svp");
   
   $("#maModale").modal('toggle');
   $("#maModale").modal('show');
}

$("#btn_valider_connexion").click(function(){
      // Authentification de l'utilisateur
      authentification();
});
//Afficher la formulaire d'inscription
$("#btn_inscription").click(function(){
   $(".formInscription").css({"display":"block"});
   //Cacher les autres formulaires 
   $(".formConnexion").css({"display":"none"}); 
   $(".formMdpOublie").css({"display":"none"});
   $(".pub").css({"display":"none"});

   // Remplissage de la liste sur les catégories
   recupListCtgPro();
});

$("#btn_validerInscript").click(function(){
  $(".formMdpOublie").css({"display":"none"}); 
   //Cacher les autres formulaires s'ils son affiché
   $(".formConnexion").css({"display":"none"}); 
   $(".formInscription").css({"display":"block"});
    $(".pub").css({"display":"none"}); 
      // Authentification de l'utilisateur
      inscri();
});
$("#btn_validerMdpO").click(function(){
   $(".formMdpOublie").css({"display":"block"}); 
   //Cacher les autres formulaires s'ils son affiché
   $(".formConnexion").css({"display":"none"}); 
   $(".formInscription").css({"display":"none"});
    $(".pub").css({"display":"none"}); 
      // Authentification de l'utilisateur
      motDePasseOublier();
});


/*Requette ajax pour l'authentification de l'utilisateur*/
function authentification(){
  var idDonne = 99;
  var wsDonne = "demConnexion";
  var emailDonne = $("#e-mail").val();   
  var mdpDonne = $("#pwd").val();
  var statutdonne ="";
  var resultatDonne;   
   
  if(emailDonne != ""){
    if(mdpDonne != ""){
      var monUrl = "https://polenumerique.re/dl/dwwm2019/ecf/set30ws/";
         //envoie les données de la formulaire au URL cible correspondant à notre web service 
        $.get(monUrl,{id:idDonne,ws:wsDonne,email:emailDonne,mdp:mdpDonne},function(reponses,status){
            //Remarque reponses correspond au fichier JSON retourné par le serveur
          console.log(status+reponses); 
          resultatDonne = reponses;
          statutdonne = status;            
         });

          setTimeout(function(){
            //Astuce utilisé par rapport au problème de cross origine quand on saisi les bonnes données d'identification
            if(statutdonne == "error"){
               $(".messageErreur small").html("Adresse e-mail ou mot de passe incorrect!");
               $(".messageErreur").css({"visibility":"visible"});
               setTimeout(function(){
                  $(".messageErreur small").hide();   
               },1000);

            }else if(statutdonne == "success" && emailDonne == "admn@afpar.com"){
              $(".messageErreur small").html("Le site est en maintenance. Veuillez réessayer plus tard svp!");
              $(".messageErreur").css({"visibility":"visible"});
                var url = `./html/admin.html`;
                location.replace(url);
              }else if(statutdonne == "success" && emailDonne == "memb@afpar.com"){
                $(".messageErreur small").html("Le site est en maintenance. Veuillez réessayer plus tard svp!");
                $(".messageErreur").css({"visibility":"visible"});
                  var url = `./html/membre.html`;
                  location.replace(url);
              }else{
                var url = `http://polenumerique.re/dl/dwwm2019/ecf/set30ws/`;
                location.replace(url);
               }
          },2000);
      }else{
         $(".messageErreur").css({"visibility":"visible"});
         $(".messageErreur small").html("Veuillez renseigner votre mot de passe!");
      }
    }else{      
      $(".messageErreur").css({"visibility":"visible"});
      $(".messageErreur small").html("Veuillez renseigner votre email!");
   }
};

// Requette ajax pour le recuperer la liste des catégories professionnelles
function recupListCtgPro(){
   var monURL = "https://polenumerique.re/dl/dwwm2019/ecf/set30ws/?id=99&ws=listeCatPro";
   $.ajax(
      {
         url : monURL , 
         complete:  function(xhr,textstatus){
            objetJson = JSON.parse(xhr.responseText);
            // remplissage de la liste déroulante avec les catégories
            rempliListCtgPro(objetJson,textstatus);
         }
      }
   );
}

// Fonction de remplissage de la liste déroulante avec les catégories professionnelles
function rempliListCtgPro(objetJson,statut){
   var ctgRecu = objetJson.data;
   var listederoulante = $(".custom-select");
   var htm ="";
   htm += "<option selected>Séléctionner une catégorie</option>";
   for (var compteur = 0; compteur < ctgRecu.length; compteur++) {
      htm += "<option>"+ctgRecu[compteur].libCP+"</option>";
    }
   listederoulante.html(htm);
}

/*Vérification des champs de la formulaire de Mot de passe oublié*/
function verifChampsFormMdpO(){
   var email = $("#e-mailMdpO").val();   
   var tel = $("#telMdpO").val();
   var nouvMdp = $("#nouvMdpO").val();
   var renouvMdp = $("#nouvMdpO2").val();
  
}

// Vérification des champs de la formulaire d'inscription
function verifChampsFormInscript(){
   
    var email = $("#e-mailDmdInscript").val();   
   var tel = $("#telMdpO").val();
   var nouvMdp = $("#nouvMdpO").val();
   var renouvMdp = $("#nouvMdpO2").val();
   
}

function checkNum1(){
   var num = document.getElementById('telInscript');
   var vert = "#06E98E";
    var rouge = "#FE0101";
   var none = "";
    var valide=/^0[1-7]+/;
    
  
    if(valide.test(num.value)){
        num.style.backgroundColor = vert;
    }
    else if(num.value == "" ){
      num.style.backgroundColor = none;
   }
 
    else{
        num.style.backgroundColor = rouge;
    }   
};
//Verification pour le numero de téléphone, si c'est correcte.
function checkNum(){
   var numtel = document.getElementById('telMdpO');
   // var message = document.getElementById('confirmeNum');
   var vert1 = "#06E98E";
    var rouge1 = "#FE0101";
   var none1 = "";
    var valide1=/^0[1-7]+/;
    
    //Ici on affiche le font soit vert si c'est correcte
    if(valide1.test(numtel.value)){
        numtel.style.backgroundColor = vert1;
      // message.style.color = vert;
      //   message.innerHTML = "Numéro Correct!";
    }
    // ici on affiche le font soit blanc si c'est encore vide.
    else if(numtel.value == "" ){
      numtel.style.backgroundColor = none1;
        // message.style.color = none;
        // message.innerHTML = "";
   }
    // ici on affiche le font sopit rouge si ce n'est pas correcte
    else{
        numtel.style.backgroundColor = rouge1;
      // message.style.color = rouge;
      //   message.innerHTML = "Numéro Incorrect!";
    }   
}



$(document).ready(function() {
  $('#mdpInscript, #mdpInscript2').on('keyup', function(e) {
    if( $('#mdpInscript').val() != $('#mdpInscript2').val()){
        $('#force_mdpins').removeClass().addClass('alert alert-error').html('Mot de passe et ressaisie ne sont pas les même');
            return false;
      }
 
        // Doit avoir une majuscule, des chiffres et des minuscules
        var strongregex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
 
        // Doit avoir des majuscules et des lettres minuscules ou des minuscules et des chiffres
        var mediumregex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
 
        // Doit comporter au moins 6 caractères
        var okregex = new RegExp("(?=.{6,}).*", "g");
 
        if (okregex.test($(this).val()) === false) {
            // Si ok regex ne correspond pas au mot de passe
               $('#force_mdpins').removeClass().addClass('alert alert-error').html('Mot de passe doivent avoir plus de  6 caractère.');
 
        } else if (strongregex.test($(this).val())) {
            // Si reg ex correspond à un mot de passe fort
            $('#force_mdpins').removeClass().addClass('alert alert-success').html('Bon mot de passe!');
        } else if (mediumregex.test($(this).val())) {
            // Si reg ex correspond à un mot de passe moyenne
            $('#force_mdpins').removeClass().addClass('alert alert-info').html('Renforcez votre mot de passe avec plus de lettres majuscules, plus de chiffres et de caractères spéciaux!');
        } else {
            // Si le mot de passe est ok
            $('#force_mdpins').removeClass().addClass('alert alert-error').html('Mot de passe faible, essayez utiliser des chiffres et des lettres majuscules.');
        }
 
        return true;
    });
  });

// //ici je voulais faire comme dans l'insciption, que le mot de passe soit complèxe et plus de 6 caractère.
    
$(document).ready(function() {
  $('#nouvMdp, #renouvMdp').on('keyup', function(e) {
    if($('#nouvMdp').val() != $('#renouvMdp').val()){
          $('#force_mdp').removeClass().addClass('alert alert-error').html('Mot de passe et ressaisie ne sont pas les même');
 
          return false;
        }
 
        // Doit avoir une majuscule, des chiffres et des minuscules
        var strongregex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
 
        // Doit avoir des majuscules et des lettres minuscules ou des minuscules et des chiffres
        var mediumregex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
 
        // Doit comporter au moins 6 caractères
        var okregex = new RegExp("(?=.{6,}).*", "g");
 
        if (okregex.test($(this).val()) === false) {
            // Si ok regex ne correspond pas au mot de passe
               $('#force_mdp').removeClass().addClass('alert alert-error').html('Mot de passe doivent avoir plus de  6 caractère.');
 
        } else if (strongregex.test($(this).val())) {
            // Si reg ex correspond à un mot de passe fort
            $('#force_mdp').removeClass().addClass('alert alert-success').html('Bon mot de passe!');
        } else if (mediumregex.test($(this).val())) {
            // Si reg ex correspond à un mot de passe moyenne
            $('#force_mdp').removeClass().addClass('alert alert-info').html('Renforcez votre mot de passe avec plus de lettres majuscules, plus de chiffres et de caractères spéciaux!');
        } else {
            // Si le mot de passe est ok
            $('#force_mdp').removeClass().addClass('alert alert-error').html('Mot de passe faible, essayez utiliser des chiffres et des lettres majuscules.');
        }
 
        return true;
    });
   });

  
function inscri(){
  //declaration des variable
  var idFourni = 99;
  var wsFourni = "demInscription";
  var emailFourni = $("#e-mailDmdInscript").val();
  var nomFourni= $("#nom").val();
  var prenomFourni= $("#prenom").val();   
  var mdpFourni = $("#mdpInscript").val();
  var telFourni = $("#telInscript").val();
  var catProFourni = $("#catproFourni").val();
   
  var Url = "https://polenumerique.re/dl/dwwm2019/ecf/set30ws/";
  //requette et attendre une reponse du json
    $.get(Url,{id:idFourni,ws:wsFourni,email:emailFourni,mdp:mdpFourni,nom:nomFourni,prenom:prenomFourni,teleph:telFourni,catpro:catProFourni},function(reponses,status){
      console.log(reponses);
      console.log(status); 
        if( status == "success"){
          if(reponses.retour == 'ok'){
            // si la reponse du json soit ok, l'affichage sur le modale sera, un email est bien envoye sur votre compte
            $(".modal-title").html("Demande d'inscription");
            $("#modalMessage").html("Un email a été bien envoyé.");
            $("#maModale").modal('toggle');
            $("#maModale").modal('show');
               
          }else if( reponses.retour =="4"){
            //si la reponse du json soit:4, l'affichage sur le modale sera le numro de téléphone est invalide
            $(".modal-title").html("Demande d'inscription");
            $("#modalMessage").html("le numero de téléphone est invalide.");
            $("#maModale").modal('toggle');
            $("#maModale").modal('show');
            
          }else if(reponses.retour == "6"){
           // si la reponse du json est 6, l'affichage sur le modale sera l'email existe déjà
            $(".modal-title").html("Demande d'inscription");
            $("#modalMessage").html("une démande inscription est déjà envoyer.");
            $("#maModale").modal('toggle');
            $("#maModale").modal('show');
          }else if(reponses.retour == "3"){
           // si la reponse du json est 3, l'affichage sur la modale sera mot de passe trop simple
            $(".modal-title").html("Demande d'inscription");
            $("#modalMessage").html("Mot de passe trop simple.");
            $("#maModale").modal('toggle');
            $("#maModale").modal('show');
          }else if(reponses.retour == "5"){
           // si la reponse du json est 5, l'affichage sur le modale sera ce email existe déjà
            $(".modal-title").html("Demande d'inscription");
            $("#modalMessage").html("Ce e-mail existe déjà.");
            $("#maModale").modal('toggle');
            $("#maModale").modal('show');
          }
        }
    });
  }

function motDePasseOublier(){
  //declaration es variable
  var idOublie = 99;
  var wsOublie = "demNouvMDP";
  var emailOublie = $("#e-mailMdpO").val(); 
  var nvmdpOublie = $("#nouvMdp").val();
  var telOublie = $("#telMdpO").val();
  var mUrl = "https://polenumerique.re/dl/dwwm2019/ecf/set30ws/";
         
      //envoyer une requete et recevoir une json      
    $.get(mUrl,{id:idOublie,ws:wsOublie,email:emailOublie,teleph:telOublie,nouvMdp:nvmdpOublie},function(reponses,status){
          
      console.log(status+reponses); 
     
        if( status == "success"){
          if(reponses.retour == 'ok'){
            //si la reponse du json soit ok, affiche sur le modale comme le changement de mot de passe est envoyé a votre email
              $(".modal-title").html("Demande changement mot de passe");
                $("#modalMessage").html("le changement de mot de passe est bien envoyer a votre email.");
                $("#maModale").modal('toggle');
                $("#maModale").modal('show');
              // si la reponse du json soit 4, affiche sur le modale comme le téléphone ou email est invalide  
            }else if( reponses.retour =="4"){
              $(".modal-title").html("Demande changement mot de passe");
                $("#modalMessage").html("le téléphone ou email est invalide.");
                $("#maModale").modal('toggle');
                $("#maModale").modal('show');
                //si la reponse du json soit 3, affichage du modal comme le mot de passe soit très simple
              }else if( reponses.retour =="3"){
              $(".modal-title").html("Demande changement mot de passe");
                $("#modalMessage").html("le Mot de passe est tres simple.");
                $("#maModale").modal('toggle');
                $("#maModale").modal('show');
            }
          }
      });
  }

      