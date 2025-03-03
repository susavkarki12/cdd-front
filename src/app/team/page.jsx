import React from 'react';
import styles from './page.module.css'; // Import CSS Module

const students = [
    { name: "Rajesh", rollNumber: "PUR077BEI031", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Sachin", rollNumber: "PUR077BEI034", image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "Susav", rollNumber: "PUR077BEI043", image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Yogesh", rollNumber: "PUR077BEI046", image: "https://randomuser.me/api/portraits/men/4.jpg" }
];

export default function Page() {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {students.map((student, index) => (
                    <li key={index} className={styles.listItem}>
                        <div className={styles.card}>
                            <img src={student.image} alt={student.name} className={styles.profileImage} />
                            <p className={styles.name}>{student.name}</p>
                            <p className={styles.rollNumber}>Roll No: {student.rollNumber}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
