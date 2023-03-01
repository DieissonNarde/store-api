import ClientRepository from '../repositories/client.repository.js';

async function createClient(client) {
  return await ClientRepository.insertClient(client);
}

async function getClients(client) {
  return await ClientRepository.getClients();
}

export default {
  createClient,
  getClients,
};
