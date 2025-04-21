// This file manages the functionality related to adding and managing student information, including names and ages.

document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.querySelector('.student-form');
    const studentsList = document.getElementById('students-list-container');

    // Función para mostrar notificaciones
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Manejar agregar estudiante
    studentForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('studentName').value;
        const age = document.getElementById('studentAge').value;
        
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const newStudent = {
            id: Date.now(),
            name,
            age
        };
        
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));
        
        // Mostrar notificación
        showNotification('Alumno agregado exitosamente');
        
        // Limpiar formulario
        studentForm.reset();
        
        // Actualizar lista
        loadStudentsList();
    });

    // Función para cargar lista de estudiantes
    function loadStudentsList() {
        if (!studentsList) return;
        
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        
        if (students.length === 0) {
            studentsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-plus"></i>
                    <p>No hay alumnos registrados</p>
                </div>
            `;
            return;
        }

        studentsList.innerHTML = students.map(student => `
            <div class="student-card">
                <div class="student-info">
                    <div class="student-avatar">
                        ${student.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="student-details">
                        <h4>${student.name}</h4>
                        <p>${student.age} años</p>
                    </div>
                </div>
                <button class="delete-student" onclick="deleteStudent(${student.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');
    }

    // Función para eliminar estudiante
    window.deleteStudent = function(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
            let students = JSON.parse(localStorage.getItem('students') || '[]');
            students = students.filter(student => student.id !== id);
            localStorage.setItem('students', JSON.stringify(students));
            loadStudentsList();
            showNotification('Alumno eliminado exitosamente');
        }
    };

    // Cargar estudiantes al iniciar
    loadStudentsList();
});

// Mostrar modal de estudiantes
document.getElementById('students-list')?.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById('students-modal');
    modal.style.display = 'block';
});

// Cerrar modales
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});