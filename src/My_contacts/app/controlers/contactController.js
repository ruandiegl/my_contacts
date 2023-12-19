const { response } = require('express');
const contactsRepository = require('../repositories/contactsRepository')

class contactController {
    async index(request, response) {
      const {orderBy} = request.query
     const contacts = await contactsRepository.findaAll(orderBy);

     response.json(contacts)
    }


    async show(request, response) {
      const { id } = request.params

      const contact = await contactsRepository.findById(id);

      if(!contact) {
        return response.status(404).json({error: 'User not found' })
      }

      response.json(contact);

    }

    async store(request, response) {
      const { name,email,phone, category_id} = request.body;

      const contactExist = await contactsRepository.findByEmail(email);

      if (!name) {
        return response.status(400).json({error: "Name required"})

      }
      if (contactExist) {
        return response.status(400).json({error: "This email is already in use"})
      }
      const contact = await contactsRepository.create({
        name, email, phone, category_id,
      })

      response.json(contact)
    }

    async update(request, response) {
      const { id } = request.params
      const {
        name, email, phone, category_id,
      } = request.body;
      const contactExist = await contactsRepository.findById(id);
      if(!contactExist) {
        return response.status(404).json({ error: "User not found"})
      }
      if (!name) {
        return response.status(400).json({error: "Name required"})

      }

      const contactByEmail = await contactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({error: "This email is already in use"})
      }

      const contact = await contactsRepository.update(id, {
        name, email, phone, category_id,
      });
      response.json(contact);
    }

    async delete(request, response) {
      const { id } = request.params

      const contact = await contactsRepository.findById(id);

      if(!contact) {
        return response.status(404).json({error: 'User not found' })
      }

      await contactsRepository.delete(id)
      response.sendStatus(204)
    }
}
//singletron
module.exports = new contactController();
