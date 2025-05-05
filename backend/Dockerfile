# ---- Build Stage ----
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

# Copy the pom.xml first and download dependencies
COPY to-do-list/pom.xml .
RUN mvn dependency:go-offline -B

# Copy rest of the project files
COPY to-do-list/src ./src
COPY to-do-list/.mvn ./.mvn
COPY to-do-list/mvnw .
COPY to-do-list/mvnw.cmd .

# Fix line endings and make mvnw executable
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Build the project
RUN mvn clean package -DskipTests

# ---- Run Stage ----
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy built jar from the previous stage
COPY --from=build /app/target/to-do-list-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3001/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]