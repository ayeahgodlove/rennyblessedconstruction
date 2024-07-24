const Document = require("../models/document");

class DocumentsController {
  async getAllDocuments() {
    try {
      const documents = await Document.findAll();
      return documents;
    } catch (error) {
      throw error;
    }
  }
  async getDocument(documentId) {
    try {
      const document = await Document.findByPk(documentId);

      if (!document) {
        throw Error("Document not found!");
      }
      return document;
    } catch (error) {
      throw error;
    }
  }

  async createDocument(document) {
    try {
      const createdDocument = await Document.create(document);
      return createdDocument;
    } catch (error) {
      throw error;
    }
  }

  async editDocument(document) {
    const { id } = document;
    try {
      const document = await Document.findByPk(id);

      if (!document) {
        throw Error("Document not found!");
      }
      const updatedDocument = await document.update(document);
      return updatedDocument;
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(id) {
    try {
      const document = await Document.findByPk(id);
      if (!document) {
        throw new Error("Document not found");
      }
      await document.destroy();
      return { message: "Document deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DocumentsController;
