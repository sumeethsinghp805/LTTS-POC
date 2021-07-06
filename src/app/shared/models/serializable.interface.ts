export interface Serializable {
    deserialize (input : Object);
    deserializeList (input : any)
}