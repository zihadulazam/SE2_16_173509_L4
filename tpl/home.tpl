<html>
    <head>
        <title>Gestione Employee</title>
        <!--Import Google Icon Font-->
        <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <!--Import materialize.css-->
        <link type="text/css" rel="stylesheet" href="../css/materialize.min.css"  media="screen,projection"/>

        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta charset="utf-8"/>
    </head>
    <body>
        <div class="card-panel teal lighten-2 center-align"><h4>(:msg:)</h4></div>
        <div class="container">
            <!--conteiner cerca-->
            <div>
                <h4>Cerca</h4>
                <form method="GET" id="myForm">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="searchId" name="searchId" type="text" class="validate" value="(:id:)">
                            <label for="searchId">Cerca Con ID</label>
                        </div>
                        <div class="input-field col s3 right-align">
                            <a class="waves-effect waves-light btn" onclick="cerca();"><i class="material-icons left">search</i>Cerca</a>
                        </div>
                        <div class="input-field col s3 left-align">
                            <a class="waves-effect waves-light btn" onclick="elimina();"><i class="material-icons left">delete</i>Elimina</a>
                        </div>
                    </div>
                </form>
            </div>
            <!--conteiner insert-form-->
            <div>
                <a class="waves-effect waves-light btn" onclick="toggle_insert()"><i class="material-icons left">toc</i>Inserisci</a>
                <form method="POST" action="/insert" id="insert-form" style="
                    (:if[hide] ~
                        [:then ~ display:none :]
                    :)
                ">
                    <div class="input-field">
                        <input id="id" name="id" type="text" class="validate" value="(:id:)">
                        <label for="id">ID</label>
                    </div>
                    <div class="input-field">
                        <input id="name" name="name" type="text" class="validate" value="(:name:)">
                        <label for="name">Nome</label>
                    </div>
                    <div class="input-field">
                        <input id="surname" name="surname" type="text" class="validate" value="(:surname:)">
                        <label for="surname">Cognome</label>
                    </div>
                    <div class="input-field">
                        <input id="level" name="level" type="text" class="validate" value="(:level:)">
                        <label for="level">Livello</label>
                    </div>
                    <div class="input-field">
                        <input id="salary" name="salary" type="text" class="validate" value="(:salary:)">
                        <label for="salary">Paga</label>
                    </div>
                    <div class="input-field center-align">
                        <a type="submit" class="waves-effect waves-light btn" onclick="inserisci();"><i class="material-icons left">playlist_add</i>Aggiungi</a>
                    </div>
                </form>
            </div>
        </div>
        <!--Import jQuery before materialize.js-->
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="../js/materialize.min.js"></script>
        <script type="text/javascript" src="../js/script.js"></script>
    </body>
</html>