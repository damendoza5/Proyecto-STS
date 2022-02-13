const Pacientes = require('../../dao/pacientes/pacientes.model..sqlite');
describe('Testing Pacientes Model', () => {
    let pacientesModel = undefined;
    let lastId = 0;
    beforeAll( (done) =>{
        pacientesModel = new Pacientes();
        setTimeout(() => {
            done();
        },3000);
    });

    it('pacientesModel Esta definido', ()=> {
        expect(pacientesModel).toBeDefined();
    });

    it('getAll Devuelve un array.', async () => {
        const arrPacientes = await pacientesModel.getAll();
        expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });

    it('new guarde un dato', async () => {
        const resultado = await pacientesModel.new(
            'Test Prueba',
            'Fulano',
            '00000000001',
            '98271342',
            'correo@correo.com'
        );
        lastId = resultado;
        console.log(resultado);
        expect(resultado).toBeDefined();
    });

    it('getbyId Devuelve un array.', async () => {
        const resultado = await pacientesModel.getById(
            lastId
        );
        console.log(resultado);
        expect(resultado).toBeDefined();
    });

    it('Eliminar un dato', async () => {
        const resultado = await pacientesModel.deleteOne(
            lastId
        );
        console.log(resultado);
        expect(resultado).toBeDefined();
    });
});