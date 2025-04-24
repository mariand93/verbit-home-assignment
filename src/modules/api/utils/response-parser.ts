/**
 * Utility to parse API responses
 */
export class ResponseParser {
    /**
     * Extract specific fields from a response
     */
    static extractFields<T extends object, K extends keyof T>(data: T, fields: K[]): Pick<T, K> {
      const result = {} as Pick<T, K>;
      
      fields.forEach(field => {
        if (field in data) {
          result[field] = data[field];
        }
      });
      
      return result;
    }
  
    /**
     * Find item in array by property value
     */
    static findByProperty<T>(items: T[], property: keyof T, value: any): T | undefined {
      return items.find(item => item[property] === value);
    }
  }