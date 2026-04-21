import {
  NotificationCategory,
  NotificationChannel,
} from "./notification_preferences_pb";

export const allNotificationCategories: NotificationCategory[] = Object.values(
  NotificationCategory
).filter((value) => typeof value === "number") as NotificationCategory[];

const notificationCategoryToStringMapping: {
  [key in NotificationCategory]: string;
} = {
  [NotificationCategory.UNSPECIFIED]: "-",
  [NotificationCategory.TRANSACTIONAL]: "Transactional",
  [NotificationCategory.SECURITY]: "Security",
  [NotificationCategory.ACCOUNT]: "Account",
  [NotificationCategory.PLATFORM_UPDATES]: "Platform Updates",
  [NotificationCategory.MARKETING]: "Marketing",
};

const stringToNotificationCategoryMapping: Record<
  string,
  NotificationCategory
> = {};
for (const [key, value] of Object.entries(
  notificationCategoryToStringMapping
)) {
  stringToNotificationCategoryMapping[value] = Number(key);
}

class UnsupportedNotificationCategoryError extends Error {
  notificationCategory: NotificationCategory;

  constructor(notificationCategory: NotificationCategory) {
    const message = `Unsupported NotificationCategory: ${notificationCategory}`;
    super(message);
    this.notificationCategory = notificationCategory;
  }
}

export function notificationCategoryToString(
  notificationCategory: NotificationCategory
): string {
  if (notificationCategory in notificationCategoryToStringMapping) {
    return notificationCategoryToStringMapping[notificationCategory];
  } else {
    throw new UnsupportedNotificationCategoryError(notificationCategory);
  }
}

class UnsupportedNotificationCategoryStringError extends Error {
  notificationCategoryStr: string;

  constructor(notificationCategoryStr: string) {
    const message = `Unsupported NotificationCategory string: ${notificationCategoryStr}`;
    super(message);
    this.notificationCategoryStr = notificationCategoryStr;
  }
}

export function stringToNotificationCategory(
  notificationCategoryStr: string
): NotificationCategory {
  if (notificationCategoryStr in stringToNotificationCategoryMapping) {
    return stringToNotificationCategoryMapping[notificationCategoryStr];
  } else {
    throw new UnsupportedNotificationCategoryStringError(
      notificationCategoryStr
    );
  }
}

export const allNotificationChannels: NotificationChannel[] = Object.values(
  NotificationChannel
).filter((value) => typeof value === "number") as NotificationChannel[];

const notificationChannelToStringMapping: {
  [key in NotificationChannel]: string;
} = {
  [NotificationChannel.UNSPECIFIED]: "-",
  [NotificationChannel.EMAIL]: "Email",
  [NotificationChannel.SMS]: "SMS",
};

const stringToNotificationChannelMapping: Record<string, NotificationChannel> =
  {};
for (const [key, value] of Object.entries(notificationChannelToStringMapping)) {
  stringToNotificationChannelMapping[value] = Number(key);
}

class UnsupportedNotificationChannelError extends Error {
  notificationChannel: NotificationChannel;

  constructor(notificationChannel: NotificationChannel) {
    const message = `Unsupported NotificationChannel: ${notificationChannel}`;
    super(message);
    this.notificationChannel = notificationChannel;
  }
}

export function notificationChannelToString(
  notificationChannel: NotificationChannel
): string {
  if (notificationChannel in notificationChannelToStringMapping) {
    return notificationChannelToStringMapping[notificationChannel];
  } else {
    throw new UnsupportedNotificationChannelError(notificationChannel);
  }
}

class UnsupportedNotificationChannelStringError extends Error {
  notificationChannelStr: string;

  constructor(notificationChannelStr: string) {
    const message = `Unsupported NotificationChannel string: ${notificationChannelStr}`;
    super(message);
    this.notificationChannelStr = notificationChannelStr;
  }
}

export function stringToNotificationChannel(
  notificationChannelStr: string
): NotificationChannel {
  if (notificationChannelStr in stringToNotificationChannelMapping) {
    return stringToNotificationChannelMapping[notificationChannelStr];
  } else {
    throw new UnsupportedNotificationChannelStringError(notificationChannelStr);
  }
}
