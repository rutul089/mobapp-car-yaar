// Input.types.js

/**
 * @typedef {'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url'} KeyboardType
 * @typedef {'done' | 'go' | 'next' | 'search' | 'send' | 'none' | 'previous' | 'default'} ReturnKeyType
 */

/**
 * @typedef {Object} InputProps
 * @property {string} [label] - The main label shown above the input.
 * @property {object} [labelStyles] - Style object for the main label.
 * @property {string} [optionalLabel] - An optional label displayed alongside the main label.
 * @property {string} [labelTextColor] - Custom text color for the label.
 * @property {object} [optionalLabelStyle] - Style object for the optional label.
 * @property {boolean} [isDisabled=false] - If true, disables the input field.
 * @property {boolean} [isAsDropdown=false] - If true, renders input as a dropdown instead of editable text input.
 * @property {number|string} [inputContainerWidth] - Width for the input container.
 * @property {object} [inputContainerBorder] - Border styles for the input container.
 * @property {string} [inputContainerBackgroundColor] - Background color of the input container.
 * @property {string} [inputContainerBackgroundColorFocused] - Background color when input is focused.
 * @property {object} [inputContainerStyles] - Custom style for the input container.
 * @property {function} [onPress] - Callback function when the input (as a dropdown) is pressed.
 * @property {object} [inputStyles] - Custom styles for the TextInput.
 * @property {string} [value] - Current value of the input field.
 * @property {object} [dropdownItemStyle] - Styles for dropdown items if rendered as a dropdown.
 * @property {boolean} [secureTextEntry] - If true, hides input text (e.g., for passwords).
 * @property {KeyboardType} [keyboardType] - Type of keyboard to display.
 * @property {string} [placeholder] - Placeholder text for the input field.
 * @property {(text: string) => void} [onChangeText] - Callback when input value changes.
 * @property {object} [restProps] - Any additional props passed to the TextInput.
 * @property {() => void} [onFocus] - Callback fired when input is focused.
 * @property {() => void} [onBlur] - Callback fired when input is blurred.
 * @property {boolean} [disableFocusHandling=false] - If true, disables internal focus tracking/styling.
 * @property {boolean} [isRightIconVisible=false] - If true, renders a right-side icon inside input.
 * @property {React.ReactNode} [rightIcon] - Custom React node to use as the right icon.
 * @property {string} [rightIconName] - Name of right icon (if using an icon library).
 * @property {string} [rightIconColor] - Color for the right icon.
 * @property {object} [rightIconStyle] - Style for the right icon.
 * @property {() => void} [onRightIconPress] - Callback when right icon is pressed.
 * @property {boolean} [isLeftIconVisible=false] - If true, renders a left-side icon inside input.
 * @property {React.ReactNode} [leftIcon] - Custom React node to use as the left icon.
 * @property {string} [leftIconName] - Name of left icon (if using an icon library).
 * @property {string} [leftIconColor] - Color for the left icon.
 * @property {object} [leftIconStyle] - Style for the left icon.
 * @property {boolean} [isError] - If true, highlights input as an error.
 * @property {object} [statusMsgStyle] - Style for the error/success message under input.
 * @property {boolean} [rightIcnDisable] - If true, disables the right icon press interaction.
 * @property {() => void} [onSubmitEditing] - Callback for the `onSubmitEditing` event.
 * @property {ReturnKeyType} [returnKeyType] - Type of return key (e.g., 'done', 'next').
 * @property {boolean} [autoFocus=false] - If true, input auto-focuses when mounted.
 * @property {object} [optionalLabelContainerStyles] - Custom styles for optional label wrapper.
 * @property {string} [statusMsg] - Status message (e.g., validation, error, or success).
 * @property {string} [statusTextColor] - Overrides the default status message color.
 * @property {boolean} [showStatusIcon] - If true, renders an icon next to the status message.
 * @property {boolean} [showStatus] - If true, then renders status.
 * @property {React.ReactNode} [statusIcon] - Icon/component to render with the status message.
 * @property {string} [rightLabel] - Text label shown on the right side (e.g., 'Edit').
 * @property {string} [rightLabelColor] - Custom color for the right label text.
 * @property {string} [maxLength] - maxLength for the text.
 * @property {string} [placeholderTextColor] - Change place holder text color.
 * @property {() => void} [rightLabelPress] - Callback when right label is pressed.
 */

export {};
