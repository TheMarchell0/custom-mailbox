#include <iostream>
#include <googleapis/headers.h>
#include <googleapis/strings.h>
#include <googleapis/client/data/data_reader.h>
#include <googleapis/client/transport/curl_http_transport.h>
#include <googleapis/client/util/status.h>
#include <googleapis/client/auth/oauth2_authorization.h>
#include <googleapis/client/auth/oauth2_service.h>
#include <googleapis/client/transport/http_transport.h>
#include <googleapis/client/transport/http_request.h>
#include <googleapis/client/transport/http_response.h>
#include <googleapis/strings/strcat.h>

using googleapis_client::OAuth2Credential;
using googleapis_client::client::OAuth2AuthorizationFlow;
using googleapis_client::client::OAuth2Service;

void SendEmail() {
  OAuth2Credential credential;
  OAuth2AuthorizationFlow flow;
  flow.set_client_id("YOUR_CLIENT_ID");
  flow.set_client_secret("YOUR_CLIENT_SECRET");
  flow.set_authorization_uri("https://accounts.google.com/o/oauth2/auth");
  flow.set_token_credential_uri("https://accounts.google.com/o/oauth2/token");
  flow.set_redirect_uri("http://localhost");
  flow.set_scope("https://www.googleapis.com/auth/gmail.send");

  string auth_code = "YOUR_AUTH_CODE";
  auto status = flow.RefreshCredentialWithAuthCode(auth_code, &credential);

  if (!status.ok()) {
    cout << "Failed to refresh credential: " << status.error_message() << endl;
    return;
  }

  string send_url =
      "https://www.googleapis.com/gmail/v1/users/me/messages/send";

  // Тело письма string email_body = R"( { "raw": "RAW_EMAIL_DATA" } )";

  googleapis::client::CurlHttpTransport transport;
  googleapis::client::HttpRequest request;
  googleapis::client::HttpResponse response;

  request.set_url(send_url);
  request.set_content_type("application/json");
  request.set_content_reader(
      new googleapis::client::StringContentReader(email_body));

  status = transport.Post(credential, &request, &response);
  if (!status.ok()) {
    cout << "Failed to send email: " << status.error_message() << endl;
    return;
  }
  cout << "Email sent successfully." << endl;
}

void ShowEmailContent() {
  OAuth2Credential credential;
  OAuth2AuthorizationFlow flow;
  flow.set_client_id("YOUR_CLIENT_ID");
  flow.set_client_secret("YOUR_CLIENT_SECRET");
  flow.set_authorization_uri("https://accounts.google.com/o/oauth2/auth");
  flow.set_token_credential_uri("https://accounts.google.com/o/oauth2/token");
  flow.set_redirect_uri("http://localhost");
  flow.set_scope("https://www.googleapis.com/auth/gmail.readonly");

  string auth_code = "YOUR_AUTH_CODE";
  auto status = flow.RefreshCredentialWithAuthCode(auth_code, &credential);

  if (!status.ok()) {
    cout << "Failed to refresh credential: " << status.error_message() << endl;
    return;
  }

  // Получение содержимого письма по идентификатору int email_id = 12345; string
  // get_url = "https://www.googleapis.com/gmail/v1/users/me/messages/" +
  // std::to_string(email_id);

  googleapis::client::CurlHttpTransport transport;

  googleapis::client::HttpRequest request;
  googleapis::client::HttpResponse response;
  status = transport.Get(credential, get_url, &response);

  if (!status.ok()) {
    cout << "Failed to get email content: " << status.error_message() << endl;
    return;
  }
  cout << "Email content: " << response.body_reader()->RemainderToString()
       << endl;
}

void DeleteEmail() {
  OAuth2Credential credential;
  OAuth2AuthorizationFlow flow;
  flow.set_client_id("YOUR_CLIENT_ID");
  flow.set_client_secret("YOUR_CLIENT_SECRET");
  flow.set_authorization_uri("https://accounts.google.com/o/oauth2/auth");
  flow.set_token_credential_uri("https://accounts.google.com/o/oauth2/token");
  flow.set_redirect_uri("http://localhost");
  flow.set_scope("https://www.googleapis.com/auth/gmail.modify");

  string auth_code = "YOUR_AUTH_CODE";
  auto status = flow.RefreshCredentialWithAuthCode(auth_code, &credential);

  if (!status.ok()) {
    cout << "Failed to refresh credential: " << status.error_message() << endl;
    return;
  }

  // Удаление письма по идентификатору int email_id = 12345; string delete_url =
  // "https://www.googleapis.com/gmail/v1/users/me/messages/" +
  // std::to_string(email_id);

  googleapis::client::CurlHttpTransport transport;
  googleapis::client::HttpRequest request;
  googleapis::client::HttpResponse response;

  status = transport.Delete(credential, delete_url, &response);

  if (!status.ok()) {
    cout << "Failed to delete email: " << status.error_message() << endl;
    return;
  }
  cout << "Email deleted successfully." << endl;
}