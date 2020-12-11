namespace segundoParcialRecu {
    export class Cliente extends Persona {
        edad: number;
        sexo: Sexo;

        constructor(id, nombre, apellido, edad, sexo) {
            super(id, nombre, apellido);
            this.edad = edad;
            this.sexo = sexo;
        }
    }
}