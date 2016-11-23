
function toggle_insert() {
    var form=document.getElementById("insert-form");
    if(form.style.display =='none')
        form.style.display='block';
    else
        form.style.display='none';
}

function elimina(){
    var serchKey=document.getElementById('searchId').value;
    if(serchKey>=0 && serchKey!='')
    {
        var form= document.getElementById('myForm');
        form.action="/delete";
        form.submit();
    }
    else
    {
        var mesBox=document.getElementById('mesBox');
        mesBox.innerHTML='Devi inserire un intero nel campo: <Cerca con ID> e deve essere >= 0 !!!';
    }
}
function cerca(){
    var serchKey=document.getElementById('searchId').value;
    if(serchKey>=0 && serchKey!='')
    {
        var form= document.getElementById('myForm');
        form.action="/find";
        form.submit();
    }
    else
    {
        var mesBox=document.getElementById('mesBox');
        mesBox.innerHTML='Devi inserire un intero nel campo: <Cerca con ID> e deve essere >= 0 !!!';
    }
}

function inserisci() {
    var idValue=document.getElementById('id').value;
    var nameValue=document.getElementById('name').value;
    var surnameValue=document.getElementById('surname').value;
    var levelValue=document.getElementById('level').value;
    var salaryValue=document.getElementById('salary').value;

    if((idValue==''||idValue>=0)&& nameValue!='' && surnameValue!='' && levelValue>=0 && salaryValue>=0){
        var form= document.getElementById('insert-form');
        form.submit();
    }
    else{
        var mesBox=document.getElementById('mesBox');
        mesBox.innerHTML='Devi compilare bene i campi; ID, Livello e Paga devono essere Int !!!';
    }
}