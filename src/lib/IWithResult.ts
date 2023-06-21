interface IWithResult {
    result({ where }: { where?: 'missive' | 'form' | undefined }): string;
}

export { IWithResult };
