import { Model, Adapter, Helper } from 'casbin';
// Define a custom adapter that can load the model and policy from your database.
export class CustomAdapter implements Adapter {
  constructor() {
    // Initialize a connection to your database.
    // ...
  }

  async loadPolicy(model: Model) {
    const p1 = ['p', '1', 'users', 'read'].join(',');
    const p2 = ['p', '2', 'users', 'read'].join(',');
    Helper.loadPolicyLine(p1, model);
    Helper.loadPolicyLine(p2, model);
  }

  async savePolicy(model) {
    // Save the policies to your database.
    // const policies = model.getPolicy();
  }

  async addPolicy(sec, ptype, rule) {
    // Add a policy to your database.
    // await this.connection.query(
    //   'INSERT INTO policies VALUES (?, ?, ...)',
    //   rule,
    // );
  }

  async removePolicy(sec, ptype, rule) {
    // Remove a policy from your database.
    // await this.connection.query('DELETE FROM policies WHERE ...');
  }

  async removeFilteredPolicy(sec, ptype, fieldIndex, ...fieldValues) {
    // Remove policies from your database that match the specified criteria.
    // await this.connection.query('DELETE FROM policies WHERE ...');
  }
}
