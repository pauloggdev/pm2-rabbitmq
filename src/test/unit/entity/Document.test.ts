import Document from "../../../domain/entity/Document";


describe('Document Entity', () => {
    let doc:any;
    beforeEach(function(){
        doc = Document.create('Sample Document', 'https://s3.amazonaws.com/bucket/doc-123.pdf', 154398, 'application/pdf', 'b1946ac92492d2347c6235b4d2611184', 'This is the initial content.', 'ownerId-uuid');
    })
    it('should create a document with default values', () => {
        expect(doc.title).toBe('Sample Document');
        expect(doc.content).toBe('This is the initial content.');
        expect(doc.status).toBe('draft');
        expect(doc.version).toBe(1);
        expect(doc.tags).toEqual([]);
    });

    it('should update content and increment version', () => {
        doc.updateContent('New content here');
        expect(doc.content).toBe('New content here');
        expect(doc.version).toBe(2);
    });

    it('should not allow update if status is approved', () => {
        doc.submitForApproval();
        doc.approve();
        expect(() => doc.updateContent('Trying to update')).toThrowError(
            'Document cannot be updated after approval or archiving.'
        );
    });

    it('should not allow update if status is archived', () => {
        doc.submitForApproval();
        doc.approve();
        doc.archive();
        expect(() => doc.updateContent('Trying to update')).toThrowError(
            'Document cannot be updated after approval or archiving.'
        );
    });

    it('should rename the document title', () => {
        doc.rename('Updated Title');
        expect(doc.title).toBe('Updated Title');
    });

    it('should throw error on empty title rename', () => {
        expect(() => doc.rename('')).toThrowError('Title cannot be empty.');
    });

    it('should transition from draft to pending_approval', () => {
        doc.submitForApproval();
        expect(doc.status).toBe('pending_approval');
    });

    it('should approve a document in pending_approval', () => {
        doc.submitForApproval();
        doc.approve();
        expect(doc.status).toBe('approved');
    });

    it('should reject a document in pending_approval', () => {
        doc.submitForApproval();
        doc.reject();
        expect(doc.status).toBe('rejected');
    });

    it('should not allow approving a draft document', () => {
        expect(() => doc.approve()).toThrowError(
            'Only documents pending approval can be approved.'
        );
    });

    it('should not allow rejecting a draft document', () => {
        expect(() => doc.reject()).toThrowError(
            'Only documents pending approval can be rejected.'
        );
    });

    it('should archive an approved document', () => {
        doc.submitForApproval();
        doc.approve();
        doc.archive();
        expect(doc.status).toBe('archived');
    });

    it('should not archive a non-approved document', () => {
        expect(() => doc.archive()).toThrowError(
            'Only approved documents can be archived.'
        );
    });

    it('should add a tag to the document', () => {
        doc.addTag('important');
        expect(doc.tags).toContain('important');
    });

    it('should not add duplicate tags', () => {
        doc.addTag('important');
        doc.addTag('important');
        expect(doc.tags).toEqual(['important']);
    });

    it('should remove a tag from the document', () => {
        doc.addTag('important');
        doc.removeTag('important');
        expect(doc.tags).not.toContain('important');
    });


});
