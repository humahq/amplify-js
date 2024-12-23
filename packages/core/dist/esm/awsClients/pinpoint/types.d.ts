import { MetadataBearer as __MetadataBearer } from '@aws-sdk/types';
declare const Alignment: {
    readonly CENTER: 'CENTER';
    readonly LEFT: 'LEFT';
    readonly RIGHT: 'RIGHT';
};
declare const AttributeType: {
    readonly AFTER: 'AFTER';
    readonly BEFORE: 'BEFORE';
    readonly BETWEEN: 'BETWEEN';
    readonly CONTAINS: 'CONTAINS';
    readonly EXCLUSIVE: 'EXCLUSIVE';
    readonly INCLUSIVE: 'INCLUSIVE';
    readonly ON: 'ON';
};
declare const ButtonAction: {
    readonly CLOSE: 'CLOSE';
    readonly DEEP_LINK: 'DEEP_LINK';
    readonly LINK: 'LINK';
};
declare const ChannelType: {
    readonly ADM: 'ADM';
    readonly APNS: 'APNS';
    readonly APNS_SANDBOX: 'APNS_SANDBOX';
    readonly APNS_VOIP: 'APNS_VOIP';
    readonly APNS_VOIP_SANDBOX: 'APNS_VOIP_SANDBOX';
    readonly BAIDU: 'BAIDU';
    readonly CUSTOM: 'CUSTOM';
    readonly EMAIL: 'EMAIL';
    readonly GCM: 'GCM';
    readonly IN_APP: 'IN_APP';
    readonly PUSH: 'PUSH';
    readonly SMS: 'SMS';
    readonly VOICE: 'VOICE';
};
declare const DimensionType: {
    readonly EXCLUSIVE: 'EXCLUSIVE';
    readonly INCLUSIVE: 'INCLUSIVE';
};
declare const FilterType: {
    readonly ENDPOINT: 'ENDPOINT';
    readonly SYSTEM: 'SYSTEM';
};
declare const Layout: {
    readonly BOTTOM_BANNER: 'BOTTOM_BANNER';
    readonly CAROUSEL: 'CAROUSEL';
    readonly MIDDLE_BANNER: 'MIDDLE_BANNER';
    readonly MOBILE_FEED: 'MOBILE_FEED';
    readonly OVERLAYS: 'OVERLAYS';
    readonly TOP_BANNER: 'TOP_BANNER';
};
/**
 * @public
 * <p>Specifies attribute-based criteria for including or excluding endpoints from a segment.</p>
 */
export interface AttributeDimension {
    /**
     * <p>The type of segment dimension to use. Valid values are: <ul><li>INCLUSIVE - endpoints that have attributes matching the values are included in the segment.</li><li>EXCLUSIVE - endpoints that have attributes matching the values are excluded in the segment.</li><li>CONTAINS - endpoints that have attributes' substrings match the values are included in the segment.</li><li>BEFORE - endpoints with attributes read as ISO_INSTANT datetimes before the value are included in the segment.</li><li>AFTER - endpoints with attributes read as ISO_INSTANT datetimes after the value are included in the segment.</li><li>ON - endpoints with attributes read as ISO_INSTANT dates on the value are included in the segment. Time is ignored in this comparison.</li><li>BETWEEN - endpoints with attributes read as ISO_INSTANT datetimes between the values are included in the segment.</li></p>
     */
    AttributeType?: AttributeType | string;
    /**
     * <p>The criteria values to use for the segment dimension. Depending on the value of the AttributeType property, endpoints are included or excluded from the segment if their attribute values match the criteria values.</p>
     */
    Values: string[] | undefined;
}
/**
 * @public
 * <p>Specifies the settings for events that cause a campaign to be sent.</p>
 */
export interface CampaignEventFilter {
    /**
     * <p>The dimension settings of the event filter for the campaign.</p>
     */
    Dimensions: EventDimensions | undefined;
    /**
     * <p>The type of event that causes the campaign to be sent. Valid values are: SYSTEM, sends the campaign when a system event occurs; and, ENDPOINT, sends the campaign when an endpoint event (<link  linkend="apps-application-id-events">Events</link> resource) occurs.</p>
     */
    FilterType: FilterType | string | undefined;
}
/**
 * @public
 * <p>Default button configuration.</p>
 */
export interface DefaultButtonConfiguration {
    /**
     * <p>The background color of the button.</p>
     */
    BackgroundColor?: string;
    /**
     * <p>The border radius of the button.</p>
     */
    BorderRadius?: number;
    /**
     * <p>Action triggered by the button.</p>
     */
    ButtonAction: ButtonAction | string | undefined;
    /**
     * <p>Button destination.</p>
     */
    Link?: string;
    /**
     * <p>Button text.</p>
     */
    Text: string | undefined;
    /**
     * <p>The text color of the button.</p>
     */
    TextColor?: string;
}
/**
 * @public
 * <p>Specifies demographic information about an endpoint, such as the applicable time zone and platform.</p>
 */
export interface EndpointDemographic {
    /**
     * <p>The version of the app that's associated with the endpoint.</p>
     */
    AppVersion?: string;
    /**
     * <p>The locale of the endpoint, in the following format: the ISO 639-1 alpha-2 code, followed by an underscore (_), followed by an ISO 3166-1 alpha-2 value.</p>
     */
    Locale?: string;
    /**
     * <p>The manufacturer of the endpoint device, such as apple or samsung.</p>
     */
    Make?: string;
    /**
     * <p>The model name or number of the endpoint device, such as iPhone or SM-G900F.</p>
     */
    Model?: string;
    /**
     * <p>The model version of the endpoint device.</p>
     */
    ModelVersion?: string;
    /**
     * <p>The platform of the endpoint device, such as ios.</p>
     */
    Platform?: string;
    /**
     * <p>The platform version of the endpoint device.</p>
     */
    PlatformVersion?: string;
    /**
     * <p>The time zone of the endpoint, specified as a tz database name value, such as America/Los_Angeles.</p>
     */
    Timezone?: string;
}
/**
 * @public
 * <p>Provides the status code and message that result from processing data for an endpoint.</p>
 */
export interface EndpointItemResponse {
    /**
     * <p>The custom message that's returned in the response as a result of processing the endpoint data.</p>
     */
    Message?: string;
    /**
     * <p>The status code that's returned in the response as a result of processing the endpoint data.</p>
     */
    StatusCode?: number;
}
/**
 * @public
 * <p>Specifies geographic information about an endpoint.</p>
 */
export interface EndpointLocation {
    /**
     * <p>The name of the city where the endpoint is located.</p>
     */
    City?: string;
    /**
     * <p>The two-character code, in ISO 3166-1 alpha-2 format, for the country or region where the endpoint is located. For example, US for the United States.</p>
     */
    Country?: string;
    /**
     * <p>The latitude coordinate of the endpoint location, rounded to one decimal place.</p>
     */
    Latitude?: number;
    /**
     * <p>The longitude coordinate of the endpoint location, rounded to one decimal place.</p>
     */
    Longitude?: number;
    /**
     * <p>The postal or ZIP code for the area where the endpoint is located.</p>
     */
    PostalCode?: string;
    /**
     * <p>The name of the region where the endpoint is located. For locations in the United States, this value is the name of a state.</p>
     */
    Region?: string;
}
/**
 * @public
 * <p>Specifies the channel type and other settings for an endpoint.</p>
 */
export interface EndpointRequest {
    /**
     * <p>The destination address for messages or push notifications that you send to the endpoint. The address varies by channel. For a push-notification channel, use the token provided by the push notification service, such as an Apple Push Notification service (APNs) device token or a Firebase Cloud Messaging (FCM) registration token. For the SMS channel, use a phone number in E.164 format, such as +12065550100. For the email channel, use an email address.</p>
     */
    Address?: string;
    /**
     * <p>One or more custom attributes that describe the endpoint by associating a name with an array of values. For example, the value of a custom attribute named Interests might be: ["Science", "Music", "Travel"]. You can use these attributes as filter criteria when you create segments. Attribute names are case sensitive.</p> <p>An attribute name can contain up to 50 characters. An attribute value can contain up to 100 characters. When you define the name of a custom attribute, avoid using the following characters: number sign (#), colon (:), question mark (?), backslash (\), and slash (/). The Amazon Pinpoint console can't display attribute names that contain these characters. This restriction doesn't apply to attribute values.</p>
     */
    Attributes?: Record<string, string[]>;
    /**
     * <p>The channel to use when sending messages or push notifications to the endpoint.</p>
     */
    ChannelType?: ChannelType | string;
    /**
     * <p>The demographic information for the endpoint, such as the time zone and platform.</p>
     */
    Demographic?: EndpointDemographic;
    /**
     * <p>The date and time, in ISO 8601 format, when the endpoint is updated.</p>
     */
    EffectiveDate?: string;
    /**
     * <p>Specifies whether to send messages or push notifications to the endpoint. Valid values are: ACTIVE, messages are sent to the endpoint; and, INACTIVE, messages aren’t sent to the endpoint.</p> <p>Amazon Pinpoint automatically sets this value to ACTIVE when you create an endpoint or update an existing endpoint. Amazon Pinpoint automatically sets this value to INACTIVE if you update another endpoint that has the same address specified by the Address property.</p>
     */
    EndpointStatus?: string;
    /**
     * <p>The geographic information for the endpoint.</p>
     */
    Location?: EndpointLocation;
    /**
     * <p>One or more custom metrics that your app reports to Amazon Pinpoint for the endpoint.</p>
     */
    Metrics?: Record<string, number>;
    /**
     * <p>Specifies whether the user who's associated with the endpoint has opted out of receiving messages and push notifications from you. Possible values are: ALL, the user has opted out and doesn't want to receive any messages or push notifications; and, NONE, the user hasn't opted out and wants to receive all messages and push notifications.</p>
     */
    OptOut?: string;
    /**
     * <p>The unique identifier for the most recent request to update the endpoint.</p>
     */
    RequestId?: string;
    /**
     * <p>One or more custom attributes that describe the user who's associated with the endpoint.</p>
     */
    User?: EndpointUser;
}
/**
 * @public
 * <p>Specifies data for one or more attributes that describe the user who's associated with an endpoint.</p>
 */
export interface EndpointUser {
    /**
     * <p>One or more custom attributes that describe the user by associating a name with an array of values. For example, the value of an attribute named Interests might be: ["Science", "Music", "Travel"]. You can use these attributes as filter criteria when you create segments. Attribute names are case sensitive.</p> <p>An attribute name can contain up to 50 characters. An attribute value can contain up to 100 characters. When you define the name of a custom attribute, avoid using the following characters: number sign (#), colon (:), question mark (?), backslash (\), and slash (/). The Amazon Pinpoint console can't display attribute names that contain these characters. This restriction doesn't apply to attribute values.</p>
     */
    UserAttributes?: Record<string, string[]>;
    /**
     * <p>The unique identifier for the user.</p>
     */
    UserId?: string;
}
/**
 * @public
 * <p>Specifies information about an event that reports data to Amazon Pinpoint.</p>
 */
export interface Event {
    /**
     * <p>The package name of the app that's recording the event.</p>
     */
    AppPackageName?: string;
    /**
     * <p>The title of the app that's recording the event.</p>
     */
    AppTitle?: string;
    /**
     * <p>The version number of the app that's recording the event.</p>
     */
    AppVersionCode?: string;
    /**
     * <p>One or more custom attributes that are associated with the event.</p>
     */
    Attributes?: Record<string, string>;
    /**
     * <p>The version of the SDK that's running on the client device.</p>
     */
    ClientSdkVersion?: string;
    /**
     * <p>The name of the event.</p>
     */
    EventType: string | undefined;
    /**
     * <p>One or more custom metrics that are associated with the event.</p>
     */
    Metrics?: Record<string, number>;
    /**
     * <p>The name of the SDK that's being used to record the event.</p>
     */
    SdkName?: string;
    /**
     * <p>Information about the session in which the event occurred.</p>
     */
    Session?: Session;
    /**
     * <p>The date and time, in ISO 8601 format, when the event occurred.</p>
     */
    Timestamp: string | undefined;
}
/**
 * @public
 * <p>Specifies the dimensions for an event filter that determines when a campaign is sent or a journey activity is performed.</p>
 */
export interface EventDimensions {
    /**
     * <p>One or more custom attributes that your application reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create an event filter.</p>
     */
    Attributes?: Record<string, AttributeDimension>;
    /**
     * <p>The name of the event that causes the campaign to be sent or the journey activity to be performed. This can be a standard event that Amazon Pinpoint generates, such as _email.delivered. For campaigns, this can also be a custom event that's specific to your application. For information about standard events, see <a href="https://docs.aws.amazon.com/pinpoint/latest/developerguide/event-streams.html">Streaming Amazon Pinpoint Events</a> in the <i>Amazon Pinpoint Developer Guide</i>.</p>
     */
    EventType?: SetDimension;
    /**
     * <p>One or more custom metrics that your application reports to Amazon Pinpoint. You can use these metrics as selection criteria when you create an event filter.</p>
     */
    Metrics?: Record<string, MetricDimension>;
}
/**
 * @public
 * <p>Provides the status code and message that result from processing an event.</p>
 */
export interface EventItemResponse {
    /**
     * <p>A custom message that's returned in the response as a result of processing the event.</p>
     */
    Message?: string;
    /**
     * <p>The status code that's returned in the response as a result of processing the event. Possible values are: 202, for events that were accepted; and, 400, for events that weren't valid.</p>
     */
    StatusCode?: number;
}
/**
 * @public
 * <p>Specifies a batch of endpoints and events to process.</p>
 */
export interface EventsBatch {
    /**
     * <p>A set of properties and attributes that are associated with the endpoint.</p>
     */
    Endpoint: PublicEndpoint | undefined;
    /**
     * <p>A set of properties that are associated with the event.</p>
     */
    Events: Record<string, Event> | undefined;
}
/**
 * @public
 * <p>Specifies a batch of events to process.</p>
 */
export interface EventsRequest {
    /**
     * <p>The batch of events to process. For each item in a batch, the endpoint ID acts as a key that has an EventsBatch object as its value.</p>
     */
    BatchItem: Record<string, EventsBatch> | undefined;
}
/**
 * @public
 * <p>Provides information about endpoints and the events that they're associated with.</p>
 */
export interface EventsResponse {
    /**
     * <p>A map that contains a multipart response for each endpoint. For each item in this object, the endpoint ID is the key and the item response is the value. If no item response exists, the value can also be one of the following: 202, the request was processed successfully; or 400, the payload wasn't valid or required fields were missing.</p>
     */
    Results?: Record<string, ItemResponse>;
}
/**
 * @public
 *
 * The input for {@link GetInAppMessagesCommand}.
 */
export type GetInAppMessagesCommandInput = GetInAppMessagesRequest;
/**
 * @public
 *
 * The output of {@link GetInAppMessagesCommand}.
 */
export interface GetInAppMessagesCommandOutput extends GetInAppMessagesResponse, __MetadataBearer {
}
/**
 * @public
 */
export interface GetInAppMessagesRequest {
    /**
     * <p>The unique identifier for the application. This identifier is displayed as the <b>Project ID</b> on the Amazon Pinpoint console.</p>
     */
    ApplicationId: string | undefined;
    /**
     * <p>The unique identifier for the endpoint.</p>
     */
    EndpointId: string | undefined;
}
/**
 * @public
 */
export interface GetInAppMessagesResponse {
    /**
     * <p>Get in-app messages response object.</p>
     */
    InAppMessagesResponse: InAppMessagesResponse | undefined;
}
/**
 * @public
 * <p>Schedule of the campaign.</p>
 */
export interface InAppCampaignSchedule {
    /**
     * <p>The scheduled time after which the in-app message should not be shown. Timestamp is in ISO 8601 format.</p>
     */
    EndDate?: string;
    /**
     * <p>The event filter the SDK has to use to show the in-app message in the application.</p>
     */
    EventFilter?: CampaignEventFilter;
    /**
     * <p>Time during which the in-app message should not be shown to the user.</p>
     */
    QuietTime?: QuietTime;
}
/**
 * @public
 * <p>Provides all fields required for building an in-app message.</p>
 */
export interface InAppMessage {
    /**
     * <p>In-app message content.</p>
     */
    Content?: InAppMessageContent[];
    /**
     * <p>Custom config to be sent to SDK.</p>
     */
    CustomConfig?: Record<string, string>;
    /**
     * <p>The layout of the message.</p>
     */
    Layout?: Layout | string;
}
/**
 * @public
 * <p>Text config for Message Body.</p>
 */
export interface InAppMessageBodyConfig {
    /**
     * <p>The alignment of the text. Valid values: LEFT, CENTER, RIGHT.</p>
     */
    Alignment: Alignment | string | undefined;
    /**
     * <p>Message Body.</p>
     */
    Body: string | undefined;
    /**
     * <p>The text color.</p>
     */
    TextColor: string | undefined;
}
/**
 * @public
 * <p>Button Config for an in-app message.</p>
 */
export interface InAppMessageButton {
    /**
     * <p>Default button content.</p>
     */
    Android?: OverrideButtonConfiguration;
    /**
     * <p>Default button content.</p>
     */
    DefaultConfig?: DefaultButtonConfiguration;
    /**
     * <p>Default button content.</p>
     */
    IOS?: OverrideButtonConfiguration;
    /**
     * <p>Default button content.</p>
     */
    Web?: OverrideButtonConfiguration;
}
/**
 * @public
 * <p>Targeted in-app message campaign.</p>
 */
export interface InAppMessageCampaign {
    /**
     * <p>Campaign id of the corresponding campaign.</p>
     */
    CampaignId?: string;
    /**
     * <p>Daily cap which controls the number of times any in-app messages can be shown to the endpoint during a day.</p>
     */
    DailyCap?: number;
    /**
     * <p>In-app message content with all fields required for rendering an in-app message.</p>
     */
    InAppMessage?: InAppMessage;
    /**
     * <p>Priority of the in-app message.</p>
     */
    Priority?: number;
    /**
     * <p>Schedule of the campaign.</p>
     */
    Schedule?: InAppCampaignSchedule;
    /**
     * <p>Session cap which controls the number of times an in-app message can be shown to the endpoint during an application session.</p>
     */
    SessionCap?: number;
    /**
     * <p>Total cap which controls the number of times an in-app message can be shown to the endpoint.</p>
     */
    TotalCap?: number;
    /**
     * <p>Treatment id of the campaign.</p>
     */
    TreatmentId?: string;
}
/**
 * @public
 * <p>The configuration for the message content.</p>
 */
export interface InAppMessageContent {
    /**
     * <p>The background color for the message.</p>
     */
    BackgroundColor?: string;
    /**
     * <p>The configuration for the message body.</p>
     */
    BodyConfig?: InAppMessageBodyConfig;
    /**
     * <p>The configuration for the message header.</p>
     */
    HeaderConfig?: InAppMessageHeaderConfig;
    /**
     * <p>The image url for the background of message.</p>
     */
    ImageUrl?: string;
    /**
     * <p>The first button inside the message.</p>
     */
    PrimaryBtn?: InAppMessageButton;
    /**
     * <p>The second button inside message.</p>
     */
    SecondaryBtn?: InAppMessageButton;
}
/**
 * @public
 * <p>Text config for Message Header.</p>
 */
export interface InAppMessageHeaderConfig {
    /**
     * <p>The alignment of the text. Valid values: LEFT, CENTER, RIGHT.</p>
     */
    Alignment: Alignment | string | undefined;
    /**
     * <p>Message Header.</p>
     */
    Header: string | undefined;
    /**
     * <p>The text color.</p>
     */
    TextColor: string | undefined;
}
/**
 * @public
 * <p>Get in-app messages response object.</p>
 */
export interface InAppMessagesResponse {
    /**
     * <p>List of targeted in-app message campaigns.</p>
     */
    InAppMessageCampaigns?: InAppMessageCampaign[];
}
/**
 * @public
 * <p>Provides information about the results of a request to create or update an endpoint that's associated with an event.</p>
 */
export interface ItemResponse {
    /**
     * <p>The response that was received after the endpoint data was accepted.</p>
     */
    EndpointItemResponse?: EndpointItemResponse;
    /**
     * <p>A multipart response object that contains a key and a value for each event in the request. In each object, the event ID is the key and an EventItemResponse object is the value.</p>
     */
    EventsItemResponse?: Record<string, EventItemResponse>;
}
/**
 * @public
 * <p>Provides information about an API request or response.</p>
 */
export interface MessageBody {
    /**
     * <p>The message that's returned from the API.</p>
     */
    Message?: string;
    /**
     * <p>The unique identifier for the request or response.</p>
     */
    RequestID?: string;
}
/**
 * @public
 * <p>Specifies metric-based criteria for including or excluding endpoints from a segment. These criteria derive from custom metrics that you define for endpoints.</p>
 */
export interface MetricDimension {
    /**
     * <p>The operator to use when comparing metric values. Valid values are: GREATER_THAN, LESS_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN_OR_EQUAL, and EQUAL.</p>
     */
    ComparisonOperator: string | undefined;
    /**
     * <p>The value to compare.</p>
     */
    Value: number | undefined;
}
/**
 * @public
 * <p>Override button configuration.</p>
 */
export interface OverrideButtonConfiguration {
    /**
     * <p>Action triggered by the button.</p>
     */
    ButtonAction: ButtonAction | string | undefined;
    /**
     * <p>Button destination.</p>
     */
    Link?: string;
}
/**
 * @public
 * <p>Specifies the properties and attributes of an endpoint that's associated with an event.</p>
 */
export interface PublicEndpoint {
    /**
     * <p>The unique identifier for the recipient, such as a device token, email address, or mobile phone number.</p>
     */
    Address?: string;
    /**
     * <p>One or more custom attributes that describe the endpoint by associating a name with an array of values. You can use these attributes as filter criteria when you create segments.</p>
     */
    Attributes?: Record<string, string[]>;
    /**
     * <p>The channel that's used when sending messages or push notifications to the endpoint.</p>
     */
    ChannelType?: ChannelType | string;
    /**
     * <p>The demographic information for the endpoint, such as the time zone and platform.</p>
     */
    Demographic?: EndpointDemographic;
    /**
     * <p>The date and time, in ISO 8601 format, when the endpoint was last updated.</p>
     */
    EffectiveDate?: string;
    /**
     * <p>Specifies whether to send messages or push notifications to the endpoint. Valid values are: ACTIVE, messages are sent to the endpoint; and, INACTIVE, messages aren’t sent to the endpoint.</p> <p>Amazon Pinpoint automatically sets this value to ACTIVE when you create an endpoint or update an existing endpoint. Amazon Pinpoint automatically sets this value to INACTIVE if you update another endpoint that has the same address specified by the Address property.</p>
     */
    EndpointStatus?: string;
    /**
     * <p>The geographic information for the endpoint.</p>
     */
    Location?: EndpointLocation;
    /**
     * <p>One or more custom metrics that your app reports to Amazon Pinpoint for the endpoint.</p>
     */
    Metrics?: Record<string, number>;
    /**
     * <p>Specifies whether the user who's associated with the endpoint has opted out of receiving messages and push notifications from you. Possible values are: ALL, the user has opted out and doesn't want to receive any messages or push notifications; and, NONE, the user hasn't opted out and wants to receive all messages and push notifications.</p>
     */
    OptOut?: string;
    /**
     * <p>A unique identifier that's generated each time the endpoint is updated.</p>
     */
    RequestId?: string;
    /**
     * <p>One or more custom user attributes that your app reports to Amazon Pinpoint for the user who's associated with the endpoint.</p>
     */
    User?: EndpointUser;
}
/**
 * @public
 *
 * The input for {@link PutEventsCommand}.
 */
export type PutEventsCommandInput = PutEventsRequest;
/**
 * @public
 *
 * The output of {@link PutEventsCommand}.
 */
export interface PutEventsCommandOutput extends PutEventsResponse, __MetadataBearer {
}
/**
 * @public
 */
export interface PutEventsRequest {
    /**
     * <p>The unique identifier for the application. This identifier is displayed as the <b>Project ID</b> on the Amazon Pinpoint console.</p>
     */
    ApplicationId: string | undefined;
    /**
     * <p>Specifies a batch of events to process.</p>
     */
    EventsRequest: EventsRequest | undefined;
}
/**
 * @public
 */
export interface PutEventsResponse {
    /**
     * <p>Provides information about endpoints and the events that they're associated with.</p>
     */
    EventsResponse: EventsResponse | undefined;
}
/**
 * @public
 * <p>Specifies the start and end times that define a time range when messages aren't sent to endpoints.</p>
 */
export interface QuietTime {
    /**
     * <p>The specific time when quiet time ends. This value has to use 24-hour notation and be in HH:MM format, where HH is the hour (with a leading zero, if applicable) and MM is the minutes. For example, use 02:30 to represent 2:30 AM, or 14:30 to represent 2:30 PM.</p>
     */
    End?: string;
    /**
     * <p>The specific time when quiet time begins. This value has to use 24-hour notation and be in HH:MM format, where HH is the hour (with a leading zero, if applicable) and MM is the minutes. For example, use 02:30 to represent 2:30 AM, or 14:30 to represent 2:30 PM.</p>
     */
    Start?: string;
}
/**
 * @public
 * <p>Provides information about a session.</p>
 */
export interface Session {
    /**
     * <p>The duration of the session, in milliseconds.</p>
     */
    Duration?: number;
    /**
     * <p>The unique identifier for the session.</p>
     */
    Id: string | undefined;
    /**
     * <p>The date and time when the session began.</p>
     */
    StartTimestamp: string | undefined;
    /**
     * <p>The date and time when the session ended.</p>
     */
    StopTimestamp?: string;
}
/**
 * @public
 * <p>Specifies the dimension type and values for a segment dimension.</p>
 */
export interface SetDimension {
    /**
     * <p>The type of segment dimension to use. Valid values are: INCLUSIVE, endpoints that match the criteria are included in the segment; and, EXCLUSIVE, endpoints that match the criteria are excluded from the segment.</p>
     */
    DimensionType?: DimensionType | string;
    /**
     * <p>The criteria values to use for the segment dimension. Depending on the value of the DimensionType property, endpoints are included or excluded from the segment if their values match the criteria values.</p>
     */
    Values: string[] | undefined;
}
/**
 * @public
 *
 * The input for {@link UpdateEndpointCommand}.
 */
export type UpdateEndpointCommandInput = UpdateEndpointRequest;
/**
 * @public
 *
 * The output of {@link UpdateEndpointCommand}.
 */
export interface UpdateEndpointCommandOutput extends UpdateEndpointResponse, __MetadataBearer {
}
/**
 * @public
 */
export interface UpdateEndpointRequest {
    /**
     * <p>The unique identifier for the application. This identifier is displayed as the <b>Project ID</b> on the Amazon Pinpoint console.</p>
     */
    ApplicationId: string | undefined;
    /**
     * <p>The unique identifier for the endpoint.</p>
     */
    EndpointId: string | undefined;
    /**
     * <p>Specifies the channel type and other settings for an endpoint.</p>
     */
    EndpointRequest: EndpointRequest | undefined;
}
/**
 * @public
 */
export interface UpdateEndpointResponse {
    /**
     * <p>Provides information about an API request or response.</p>
     */
    MessageBody: MessageBody | undefined;
}
/**
 * @public
 */
export type Alignment = (typeof Alignment)[keyof typeof Alignment];
/**
 * @public
 */
export type AttributeType = (typeof AttributeType)[keyof typeof AttributeType];
/**
 * @public
 */
export type ButtonAction = (typeof ButtonAction)[keyof typeof ButtonAction];
/**
 * @public
 */
export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType];
/**
 * @public
 */
export type DimensionType = (typeof DimensionType)[keyof typeof DimensionType];
/**
 * @public
 */
export type FilterType = (typeof FilterType)[keyof typeof FilterType];
/**
 * @public
 */
export type Layout = (typeof Layout)[keyof typeof Layout];
export {};
