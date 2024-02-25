export default function logout() {
  localStorage.clear();
  location.href = "/";
}
