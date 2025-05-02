class Constants {
  static SUCCESS = "Success";
  static FAILURE = "Fail";

  static USERS_FOUND = "Users retrieved successfully.";
  static USER_NOT_FOUND = "User not found.";
  static INVALID_USER_PASSWORD = "Incorrect password.";
  static LOGIN_SUCCESS = "User logged in successfully.";
  static UPDATE_SUCCESS = "User updated successfully.";
  static DELETE_SUCCESS = "User deleted successfully.";

  static EMAIL_ALREADY_EXISTS = "This email address is already registered.";
  static INVALID_EMAIL = "Please enter a valid Gmail address (must end with @gmail.com).";
  static EMAIL_REQUIRED = "Please enter an email address.";

  static PHONE_ALREADY_EXISTS = "This phone number is already registered.";
  static INVALID_PHONE = "Please enter a valid phone number in the format +91 7845987410.";
  static PHONE_REQUIRED = "Please enter a phone number.";

  static PASSWORD_REQUIRED = "Please enter a password.";
  static INVALID_PASSWORD = "Password must be at least 8 characters long (e.g., Abcd@123).";

  static PROPERTY_IMAGE_REQUIRED = "Please upload at least one image.";
  static PROPERTY_Name = "Please enter the property name"
  static PROPERTY_LOCATION_REQUIRED = "Please enter the location of the property.";
  static PROPERTY_ADDRESS_REQUIRED = "Please enter the property address.";
  static PROPERTY_SIZE_REQUIRED = "Please enter the property size.";

  static PROPERTY_CREATED = "Property created successfully.";
  static PROPERTY_FOUND = "Property found successfully.";
  static PROPERTIES_FOUND = "Properties found successfully.";
  static PROPERTY_NOT_FOUND = "Property not found.";
  static PROPERTY_UPDATED = "Property updated successfully.";
  static PROPERTY_DELETED = "Property deleted successfully.";
  static PROPERTY_DATA_REQUIRED = "Property data is required.";
  static PROPERTY_NAME_REQUIRED = "Search term 'Name' is required.";
  static PROPERTY_SEARCH_EMPTY = "No properties found matching the search term.";

  static ROOMS_REQUIRED = "Total number of rooms is required.";
  static KITCHEN_REQUIRED = "Kitchen details are required.";
  static WASHROOMS_REQUIRED = "Total number of washrooms is required.";


  static PROPERTY_ANALYST_CREATED = "Property analyst created successfully.";
  static PROPERTY_ANALYST_FOUND = "Property analyst found successfully.";
  static PROPERTY_ANALYST_NOT_FOUND = "Property analyst not found.";
  static PROPERTY_ANALYST_UPDATED = "Property analyst updated successfully.";
  static PROPERTY_ANALYST_DELETED = "Property analyst deleted successfully.";
  static PROPERTY_ANALYST_DATA_REQUIRED = "Property analyst data is required.";

  static AUTH_TOKEN_MISSING = "Authorization token missing.";
  static INVALID_TOKEN = "Invalid token.";

}

module.exports = Constants;
