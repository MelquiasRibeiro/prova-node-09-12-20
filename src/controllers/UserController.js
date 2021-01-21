class PlantController {
    async index(req, res) {
     return res.json({"ok":"ta funcionando"})
    }
}

export default new PlantController();