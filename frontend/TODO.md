# Extract Styles from JSX Components to Separate CSS Files

## Components to Process
- [x] Pagination.jsx
- [x] CourseCard.jsx
- [x] Header.jsx
- [x] Footer.jsx
- [x] EnrollmentButton.jsx
- [x] FilterBar.jsx
- [x] AdminRoute.jsx
- [x] PrivateRoute.jsx

## Pages to Process
- [x] Landing.jsx
- [x] Login.jsx
- [x] Signup.jsx
- [x] Dashboard.jsx
- [x] CourseList.jsx
- [x] CourseDetail.jsx
- [x] AdminPanel.jsx

## Steps for Each File
1. Read the JSX file to identify all Tailwind classes
2. Create corresponding .css file with custom classes
3. Update JSX file to import CSS and replace Tailwind classes
4. Test that styles still work

## Notes
- Use unique class names to avoid conflicts (e.g., .pagination-container)
- Replicate Tailwind styles exactly in CSS
- Ensure no style conflicts between components
