# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0


FROM python:3.12-slim-bullseye as base

RUN apt-get -qq update \
    && apt-get install -y --no-install-recommends curl

RUN pip install Flask opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation protobuf==3.20.1
RUN opentelemetry-bootstrap -a install

ADD login_server.py login_server.py
EXPOSE ${LOGIN_SERVICE_PORT}
#ENTRYPOINT ["python3", "login_server.py"]

CMD ["opentelemetry-instrument", \
     "--traces_exporter", "console,otlp", \
     "--service_name", "LOGIN_SERVICE", \
     "--exporter_otlp_endpoint", "otelcol:4317", \
     "python3", "login_server.py"]

