var employees=[];
var nextID=3;

/**
 * @brief Oggetto employee
 * @param [in] int id id del employee.
 * @param [in] string name nome del employee.
 * @param [in] string surname cognome del employee.
 * @param [in] int level livello del contratto.
 * @param [in] int salary stipendio del employee.
 */
function employee(id,name,surname,level,salary) {
    this.id=id;
    this.name=name;
    this.surname=surname;
    this.level=level;
    this.salary=salary;
}

/**
 * @brief inizializza employe inserendo tre employee di default
 */
function initEmp() {
    employees.push(new employee(0,"Mario","Rossi",5,2000));
    employees.push(new employee(1,"Marco","Stasi",2,1000));
    employees.push(new employee(2,"Roberto","Trentini",5,3000));
}

/**
 * @brief inderisce un employee
 * @param [in] int id id del employee.
 * @param [in] string name nome del employee.
 * @param [in] string surname cognome del employee.
 * @param [in] int level livello del contratto.
 * @param [in] int salary stipendio del employee.
 */
function insert(id,name,surname,level,salary){  //ok insert
    if((id=='' || verifyInt(id)) && verifyInt(level) && verifyInt(salary)){
        //verifico se è senza id
        if(id=='')
        {
            //se senza assegno e inserisco
            id=nextID;
            nextID++;
            level=parseInt(level);
            salary=parseInt(salary);
            employees.push(new employee(id,name,surname,level,salary));
        }
        else{
            //se ha un id cerco se esiste già un employee con questo id
            id=parseInt(id);
            var index=find(id);
            if(index>=0)
            {
                //se esiste aggiorno
                employees[index].name=name;
                employees[index].surname=surname;
                employees[index].level=level;
                employees[index].salary=salary;
                console.log("Aggiornato!");
            }
            else{
                //se no devo inserire
                employees.push(new employee(id,name,surname,level,salary));
                console.log("Aggiunto nuovo!");
                employees.sort();
            }
        }
        return 1;
    }
    else{
        console.log("Error: Some Input values are not Int !!");
        return 0;
    }
}

/**
 * @brief cerca un employee con id
 * @param [in] int id id del employee.
 * @return ritorna l'indice dove si trova nel array
 */
function find(id) {
    var i;
    for(i=0;i<employees.length;i++){
        if(employees[i].id==id)
            return i;
    }
    return -1;
}

/**
 * @brief elimina un employee con id
 * @param [in] int id id del employee.
 */
function deleteElem(ind) {
    employees.splice(ind,1);
}

/**
 * @brief ritorna un oggetto employee con id
 * @param [in] int index indice del array dove si trova.
 * @return ritorna l'oggetto employee
 */
function getEmployeeByIndex(index) {
    if(index>=0 && index<employees.length){
        return employees[index];
    }
    else
        return null;
}

/**
 * @brief verifica se un var è maggiore di 0 
 * @return ritorna true se si se no ritorna false 
 */
function verifyInt(a) {
    var res;
    res=a>=0? true: false;
    return res;
}

//export functions
exports.initEmp = initEmp;
exports.getEmployeeByIndex = getEmployeeByIndex;
exports.insert=insert;
exports.find=find;
exports.deleteElem=deleteElem;