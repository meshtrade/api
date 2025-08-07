/**
 * Authentication and credential management for the Meshtrade API.
 * 
 * <p>This package provides utilities for discovering and managing API credentials
 * required for authentication with Meshtrade services.
 * 
 * <p>The credential discovery follows a hierarchy:
 * <ol>
 * <li>MESH_API_CREDENTIALS environment variable</li>
 * <li>Platform-specific credential files:
 *     <ul>
 *     <li>Linux: {@code $XDG_CONFIG_HOME/mesh/credentials.json} or {@code $HOME/.config/mesh/credentials.json}</li>
 *     <li>macOS: {@code $HOME/Library/Application Support/mesh/credentials.json}</li>
 *     <li>Windows: {@code %APPDATA%\mesh\credentials.json}</li>
 *     </ul>
 * </li>
 * </ol>
 * 
 * <h2>Example</h2>
 * <pre>{@code
 * Optional<Credentials> creds = CredentialsDiscovery.findCredentials();
 * if (creds.isPresent()) {
 *     String apiKey = creds.get().getApiKey();
 *     String group = creds.get().getGroup();
 * }
 * }</pre>
 * 
 * @see co.meshtrade.api.auth.Credentials
 * @see co.meshtrade.api.auth.CredentialsDiscovery
 */
package co.meshtrade.api.auth;