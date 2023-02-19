import { Model, Adapter, Helper } from 'casbin';
// Define a custom adapter that can load the model and policy from your database.
export enum AuthorizationModel {
  BASIC,
  RBAC,
}
export class CustomAdapter implements Adapter {
  private authorizationModel: AuthorizationModel;
  constructor(authorizationModel: AuthorizationModel) {
    // Initialize a connection to your database.
    // ...
    this.authorizationModel = authorizationModel;
  }

  async loadPolicy(model: Model) {
    if (this.authorizationModel === AuthorizationModel.BASIC) {
      const p1 = ['p', '1', 'users', 'read'].join(',');
      const p2 = ['p', '2', 'users', 'read'].join(',');
      Helper.loadPolicyLine(p1, model);
      Helper.loadPolicyLine(p2, model);
    } else {
      const data = `
      p, USERS_RETRIEVE, 1
      p, USERS_CREATE, 1
      p, USERS_UPDATE, 1
      p, USERS_DELETE, 1
      p, USERS_RETRIEVE, 2
      p, STAFF_RETRIEVE, 3
      p, PROJECTS_RETRIEVE, 3
      p, PROJECTS_RETRIEVE, 4
      p, PROJECTS_UPDATE, 3
      `;
      data
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
        .forEach((l) => {
          Helper.loadPolicyLine(l, model);
        });
    }
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

