export interface CreateDepartamentInput {
    name: string;
    type: 'department' | 'team' | 'group';
    parentId?: string;
}