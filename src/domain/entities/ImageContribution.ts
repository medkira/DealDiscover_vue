export type ImageContributionProps = {
    id: string;
    user_id: string;
    user_name: string;
    image: File[] | string[];
    place_id: string | null;
    is_verified: boolean;
    createdAt: Date;
    place_name: string;
};

export class ImageContribution {
    public readonly id: string;
    public readonly user_id: string;
    public readonly user_name: string;
    public readonly image: File[] | string[];
    public readonly place_id: string | null;
    public readonly is_verified: boolean;
    public readonly createdAt: Date;
    public readonly place_name: string;

    constructor(props: ImageContributionProps) {
        this.id = props.id;
        this.user_id = props.user_id;
        this.user_name = props.user_name;
        this.image = props.image;
        this.place_id = props.place_id;
        this.is_verified = props.is_verified;
        this.createdAt = props.createdAt;
        this.place_name = props.place_name;
    }


}
