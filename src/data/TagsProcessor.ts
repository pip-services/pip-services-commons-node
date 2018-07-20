let _ = require('lodash');

/**
 * Class that provides methods for extracting and processing search tags from objects.
 */
export class TagsProcessor {
    private static HASHTAG_REGEX = /#\w+/g;

    /**
     * Normalize a tag by replacing with the REGEX: (_|#)
     *
     * @param tag   the tag to normalize.
     * @return      a normalized tag.
     */
    public static normalizeTag(tag: string): string {
        return tag 
            ? _.trim(tag.replace(/(_|#)+/g, ' ')) 
            : null;
    }

    /**
     * Compress a tag by replacing with the REGEX: ( |_|#)
     *
     * @param tag   the tag to compress.
     * @return      a compressed tag.
     */
    public static compressTag(tag: string): string {
        return tag
            ? tag.replace(/( |_|#)/g, '').toLocaleLowerCase()
            : null;
    }

    /**
     * Determines if two tags are equal, based on their length and the characters contained.
     *
     * @param tag1  the first tag.
     * @param tag2  the second tag.
     * @return      true if the tags are equal and false otherwise.
     */
    public static equalTags(tag1: any, tag2: any): boolean {
        if (tag1 == null && tag2 == null)
            return true;
        if (tag1 == null || tag2 == null)
            return false;
        return TagsProcessor.compressTag(tag1) 
            == TagsProcessor.compressTag(tag2);
    }

    /**
     * Normalizes the tags contained in the passed String using {@link org.pipservices.runtime.data.TagProcessor#normalizeTag(String)}.
     *
     * @param tags  the tags to normalize.
     * @return      a String array of normalized tags.
     */
    public static normalizeTags(tags: any): string[] {
        if (_.isString(tags))
            tags = tags.split(/(,|;)+/);

        tags = _.map(tags, (tag) => TagsProcessor.normalizeTag(tag));

        return tags;
    }

    /**
     * Compresses the tags contained in the passed String using {@link org.pipservices.runtime.data.TagProcessor#compressTag(String)}.
     *
     * @param tags  the tags to compress.
     * @return      a String array of compressed tags.
     */
    public static compressTags(tags: any): string[] {
        if (_.isString(tags))
            tags = tags.split(/(,|;)+/);

        tags = _.map(tags, (tag) => TagsProcessor.compressTag(tag));

        return tags;
    }

    private static extractString(field: any): string {
        if (field == null) return '';
        if (_.isString(field)) return field;
        if (!_.isObject(field)) return '';
        
        let result = '';
        for (let prop in field) {
            result += ' ' + TagsProcessor.extractString(field[prop]);
        }
        return result;
    }

    /**
     * Extracts hash tags from a JSON object with the help of user-defined tag search fields.
     *
     * @param jsonObject    the JSON object to parse.
     * @param searchFields  the user-defined tag search fields.
     * @return              a String array of compressed tags, based on the user-defined 
     *                      tag search fields.
     */
    public static extractHashTags(obj: any, ...searchFields: string[]): string[] {
        let tags = TagsProcessor.compressTags(obj.tags);

        _.each(searchFields, (field) => {
            let text = TagsProcessor.extractString(obj[field]);

            if (text != '') {
                let hashTags = text.match(TagsProcessor.HASHTAG_REGEX);
                tags = tags.concat(TagsProcessor.compressTags(hashTags));
            }
        });

        return _.uniq(tags);
    }
}
