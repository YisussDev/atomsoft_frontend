import {Injectable} from "@angular/core";
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  private logRequest(method: string, url: string, options?: any) {
    // console.log(`[HTTP ${method}] Request:`, {url, options});
  }

  private logResponse(method: string, url: string, response: any) {
    // console.log(`[HTTP ${method}] Response from ${url}:`, response);
  }

  private handleError(error: any) {
    console.error("HTTP Error:", error);
    return throwError(() => error);
  }

  public get<TResponse>(
    url: string,
    options?: Partial<{
      headers: HttpHeaders;
      context: HttpContext;
      params: HttpParams;
      observe: "body";
      reportProgress: boolean;
      responseType: "json";
      withCredentials: boolean;
    }>
  ): Observable<TResponse> {
    this.logRequest("GET", url, options);
    return this.http.get<TResponse>(url, options).pipe(
      tap((response) => this.logResponse("GET", url, response)),
      catchError(this.handleError)
    );
  }

  public post<TResponse, TBody>(
    url: string,
    body: TBody,
    options?: Partial<{
      headers: HttpHeaders;
      context: HttpContext;
      observe: "body";
      reportProgress: boolean;
      responseType: "json";
      withCredentials: boolean;
    }>
  ): Observable<TResponse> {
    this.logRequest("POST", url, {body, ...options});
    return this.http.post<TResponse>(url, body, options).pipe(
      tap((response) => this.logResponse("POST", url, response)),
      catchError(this.handleError)
    );
  }

  public put<TResponse, TBody>(
    url: string,
    body: TBody,
    options?: Partial<{
      headers: HttpHeaders;
      context: HttpContext;
      observe: "body";
      reportProgress: boolean;
      responseType: "json";
      withCredentials: boolean;
    }>
  ): Observable<TResponse> {
    this.logRequest("PUT", url, {body, ...options});
    return this.http.put<TResponse>(url, body, options).pipe(
      tap((response) => this.logResponse("PUT", url, response)),
      catchError(this.handleError)
    );
  }

  public patch<TResponse, TBody>(
    url: string,
    body: TBody,
    options?: Partial<{
      headers: HttpHeaders;
      context: HttpContext;
      observe: "body";
      reportProgress: boolean;
      responseType: "json";
      withCredentials: boolean;
    }>
  ): Observable<TResponse> {
    this.logRequest("PATCH", url, {body, ...options});
    return this.http.patch<TResponse>(url, body, options).pipe(
      tap((response) => this.logResponse("PATCH", url, response)),
      catchError(this.handleError)
    );
  }

  public delete<TResponse>(
    url: string,
    options?: Partial<{
      headers: HttpHeaders;
      context: HttpContext;
      observe: "body";
      reportProgress: boolean;
      responseType: "json";
      withCredentials: boolean;
    }>
  ): Observable<TResponse> {
    this.logRequest("DELETE", url, options);
    return this.http.delete<TResponse>(url, options).pipe(
      tap((response) => this.logResponse("DELETE", url, response)),
      catchError(this.handleError)
    );
  }
}
