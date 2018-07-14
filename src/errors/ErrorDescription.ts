/**
 * This class allows us to represent exceptions in a form that is serializable.
 *   
 * When an exception is raised, we transform it into an ErrorDescription, serialize it, 
 * and then send it over the REST interface to the 'caller' microservice. On the 'caller' 
 * microservice's side we receive the ErrorDescription object and convert it back into a 
 * language specific exception. This provides cross-language error propagation via 
 * serialization.
 * 
 * If the exception that was raised is a child class of ApplicationException, we can 
 * use the ApplicationException class from the PipServices Commons library on the receiving 
 * side to process it (as long as the service is written in a language that PipServices supports).
 * 
 * On the other hand, if a specific exception is raised, then an attempt is made to raise a similar 
 * exception (from the ones available in the receiving side's language), which is closest in meaning 
 * to the exception raised in the original language.  
 * 
 * This allows us to catch, send, and process any type of exception that is raised, even between
 * services that are written in different languages.
 */
export class ErrorDescription {
	/**
     * Defines the error's type.
     */
	public type: string;
	/**
     * Defines what category of errors this error belongs to.
     */
	public category: string;
	/**
     * Used when sending over the REST interface, so that we know what status to raise.
     */
	public status: number;
	/**
     * Every error needs a unique code by which it can be identified. Using this code, 
     * we can select error messages from various natural languages to display later on 
     * in the UI.
     */
	public code: string;
	/**
     * This field stores the message that was contained in the original error. 
     * Errors' messages are always in English. However, using this class's 
     * 'code' and 'details' fields, we can translate the error's message to 
     * any other language during UI population.
     */
	public message: string;
	/**
     * This field is used when translating an error into a different natural language (to be displayed
     * later on in the UI).
     * 
     * For example, if we received an ObjectNotFoundException (general error) when searching for an 
     * object via its id, the id by which the object was not found can be added as a detail. This allows 
     * us to add additional details to our translated error messages. 
     * Resulting error message format: “{Error's text in some language} - id: {id}”
     */
	public details: any;
	/**
     * Important field for microservices, as it allows us 
     * to tie an exception to a specific business transaction. 
     */   
	public correlation_id: string;
	/**
     * Additional information, regarding to the cause of the exception.
     */ 
	public cause: string;
	/**
     * Stack trace of the exception.
     */ 
	public stack_trace: string;
}
